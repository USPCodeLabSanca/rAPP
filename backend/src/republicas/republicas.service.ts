import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { ListRepublicasQuery } from './dto';

type RepublicaRow = {
  id: string;
  nome: string;
  instagram: string;
  whatsapp: string;
  descricao: string;
  preco_mensal: string;
  criado_em: Date;
  atualizado_em: Date;
  loc_id: string | null;
  logradouro: string | null;
  numero: string | null;
  bairro: string | null;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;
  distancia_metros: number | null;
  tags: { id: number; nome: string; categoria: string }[] | string;
  fotos: { id: string; urlImagem: string; ordem: number; ePrincipal: boolean }[] | string;
};

@Injectable()
export class RepublicasService {
  private readonly assetOrigin: string;

  constructor(
    private readonly db: DatabaseService,
    config: ConfigService,
  ) {
    this.assetOrigin = config.get<string>('MOBILE_ASSET_ORIGIN') ?? 'http://10.0.2.2:9000';
  }

  async list(filters: ListRepublicasQuery) {
    const where: string[] = [];
    const params: unknown[] = [];
    const add = (value: unknown) => {
      params.push(value);
      return `$${params.length}`;
    };

    if (filters.q?.trim()) {
      const term = add(likePattern(filters.q.trim()));
      where.push(`(
        unaccent(lower(r.nome)) ILIKE unaccent(lower(${term})) ESCAPE '\\'
        OR unaccent(lower(r.descricao)) ILIKE unaccent(lower(${term})) ESCAPE '\\'
        OR unaccent(lower(COALESCE(l.bairro, ''))) ILIKE unaccent(lower(${term})) ESCAPE '\\'
        OR unaccent(lower(r.instagram)) ILIKE unaccent(lower(${term})) ESCAPE '\\'
      )`);
    }

    if (filters.tagIds?.length) {
      const tagParam = add(filters.tagIds);
      where.push(`(
        SELECT COUNT(DISTINCT rt.tag_id)
        FROM republica_tag rt
        WHERE rt.republica_id = r.id
          AND rt.tag_id = ANY(${tagParam}::int[])
      ) = ${filters.tagIds.length}`);
    }

    if (filters.precoMin != null) where.push(`r.preco_mensal >= ${add(filters.precoMin)}`);
    if (filters.precoMax != null) where.push(`r.preco_mensal <= ${add(filters.precoMax)}`);

    let distanceSelect = 'NULL::float8 AS distancia_metros';
    let orderBy = 'r.nome ASC';
    if (filters.lat != null && filters.lon != null) {
      const lat = add(filters.lat);
      const lon = add(filters.lon);
      const point = `ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)`;
      distanceSelect = `CASE WHEN l.geom IS NULL THEN NULL ELSE ST_Distance(l.geom::geography, ${point}::geography) END AS distancia_metros`;
      if (filters.ordenar === 'distancia') {
        orderBy = `(l.geom IS NULL), l.geom <-> ${point}`;
      }
    }
    if (filters.ordenar === 'recente') orderBy = 'r.atualizado_em DESC';

    const rows = await this.db.query<RepublicaRow>(
      `${this.selectSql(distanceSelect)}
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY ${orderBy}`,
      params,
    );

    return {
      republicas: rows.map((row) => this.toDto(row)),
      metricas: await this.metricas(),
    };
  }

  async findOne(id: string) {
    const row = await this.db.one<RepublicaRow>(
      `${this.selectSql('NULL::float8 AS distancia_metros')} WHERE r.id = $1`,
      [id],
    );
    if (!row) throw new NotFoundException('República não encontrada.');
    return this.toDto(row);
  }

  tags() {
    return this.db.query<{ id: number; nome: string; categoria: string }>(
      'SELECT id, nome, categoria FROM tag ORDER BY categoria, nome',
    );
  }

  pontos(lat?: number, lon?: number) {
    if (lat == null || lon == null) {
      return this.db.query<{ id: number; nome: string; latitude: number; longitude: number }>(
        'SELECT id, nome, latitude, longitude FROM ponto_referencia ORDER BY nome',
      );
    }

    return this.db.query(
      `SELECT id, nome, latitude, longitude,
              ROUND(ST_Distance(geom::geography, ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography))::int AS "distanciaMetros"
       FROM ponto_referencia
       ORDER BY "distanciaMetros", nome`,
      [lat, lon],
    );
  }

  private async metricas() {
    const row = await this.db.one<{
      total: number;
      preco_medio: string;
      com_fotos: number;
      sem_localizacao: number;
    }>(
      `SELECT COUNT(*)::int AS total,
              COALESCE(ROUND(AVG(preco_mensal), 0), 0)::text AS preco_medio,
              COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM foto f WHERE f.republica_id = r.id))::int AS com_fotos,
              COUNT(*) FILTER (WHERE NOT EXISTS (SELECT 1 FROM localizacao l WHERE l.republica_id = r.id))::int AS sem_localizacao
       FROM republica r`,
    );
    return {
      total: row?.total ?? 0,
      precoMedio: Number(row?.preco_medio ?? 0),
      comFotos: row?.com_fotos ?? 0,
      semLocalizacao: row?.sem_localizacao ?? 0,
    };
  }

  private selectSql(distanceSelect: string) {
    return `
      SELECT r.id, r.nome, r.instagram, r.whatsapp, r.descricao,
             r.preco_mensal, r.criado_em, r.atualizado_em,
             l.id AS loc_id, l.logradouro, l.numero, l.bairro, l.cep, l.latitude, l.longitude,
             ${distanceSelect},
             COALESCE(tg.tags, '[]'::json) AS tags,
             COALESCE(ft.fotos, '[]'::json) AS fotos
      FROM republica r
      LEFT JOIN localizacao l ON l.republica_id = r.id
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', t.id, 'nome', t.nome, 'categoria', t.categoria
        ) ORDER BY t.categoria, t.nome) AS tags
        FROM republica_tag rt
        JOIN tag t ON t.id = rt.tag_id
        WHERE rt.republica_id = r.id
      ) tg ON TRUE
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', f.id, 'urlImagem', f.url_imagem, 'ordem', f.ordem, 'ePrincipal', f.e_principal
        ) ORDER BY f.ordem) AS fotos
        FROM foto f
        WHERE f.republica_id = r.id
      ) ft ON TRUE
    `;
  }

  private toDto(row: RepublicaRow) {
    const tags = asArray(row.tags);
    const fotos = asArray(row.fotos).map((foto) => ({
      ...foto,
      urlImagem: this.publicUrl(foto.urlImagem),
    }));

    return {
      id: row.id,
      nome: row.nome,
      instagram: row.instagram,
      whatsapp: row.whatsapp,
      descricao: row.descricao,
      precoMensal: Number(row.preco_mensal),
      criadoEm: row.criado_em,
      atualizadoEm: row.atualizado_em,
      distanciaMetros: row.distancia_metros == null ? null : Math.round(Number(row.distancia_metros)),
      localizacao: row.loc_id
        ? {
            id: row.loc_id,
            logradouro: row.logradouro,
            numero: row.numero,
            bairro: row.bairro,
            cep: row.cep,
            latitude: Number(row.latitude),
            longitude: Number(row.longitude),
          }
        : null,
      tags,
      fotos,
    };
  }

  private publicUrl(url: string) {
    if (!url) return url;
    return url
      .replace(/^https?:\/\/127\.0\.0\.1:9000/, this.assetOrigin)
      .replace(/^https?:\/\/localhost:9000/, this.assetOrigin);
  }
}

function asArray<T>(value: T[] | string): T[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function likePattern(value: string) {
  return `%${value.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
}
