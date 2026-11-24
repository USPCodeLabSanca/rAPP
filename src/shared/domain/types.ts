export type Tag = {
  id: number;
  nome: string;
  categoria: 'refeicao' | 'universidade' | 'genero' | 'convivencia' | string;
};

export type Foto = {
  id: string;
  urlImagem: string;
  ordem: number;
  ePrincipal: boolean;
};

export type Localizacao = {
  id: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string | null;
  latitude: number;
  longitude: number;
};

export type Republica = {
  id: string;
  nome: string;
  instagram: string;
  whatsapp: string;
  descricao: string;
  precoMensal: number;
  criadoEm: string;
  atualizadoEm: string;
  distanciaMetros: number | null;
  localizacao: Localizacao | null;
  tags: Tag[];
  fotos: Foto[];
};

export type Metricas = {
  total: number;
  precoMedio: number;
  comFotos: number;
  semLocalizacao: number;
};

export type PontoReferencia = {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  distanciaMetros?: number | null;
};

export type Catalogo = {
  republicas: Republica[];
  metricas: Metricas;
};
