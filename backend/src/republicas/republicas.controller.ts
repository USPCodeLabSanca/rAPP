import { Controller, Get, NotFoundException, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ListRepublicasQuery, PontosQuery } from './dto';
import { RepublicasService } from './republicas.service';

@Controller()
export class RepublicasController {
  constructor(private readonly republicas: RepublicasService) {}

  @Get('tags')
  tags() {
    return this.republicas.tags();
  }

  @Get('pontos-referencia')
  pontos(@Query() query: PontosQuery) {
    return this.republicas.pontos(query.lat, query.lon);
  }

  @Get('republicas')
  list(@Query() query: ListRepublicasQuery) {
    return this.republicas.list(query);
  }

  @Get('republicas/:id')
  findOne(@Param('id', new ParseUUIDPipe({ exceptionFactory: () => new NotFoundException('República não encontrada.') })) id: string) {
    return this.republicas.findOne(id);
  }
}
