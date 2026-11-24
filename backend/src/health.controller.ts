import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller()
export class RootController {
  @Get()
  index() {
    return {
      ok: true,
      servico: 'rAPP visitante',
      rotas: ['/api/health', '/api/tags', '/api/republicas', '/api/pontos-referencia'],
    };
  }
}

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async health() {
    const row = await this.db.one<{ postgis: string }>('SELECT PostGIS_Version() AS postgis');
    return { ok: true, postgis: row?.postgis ?? null };
  }
}
