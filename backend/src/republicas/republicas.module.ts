import { Module } from '@nestjs/common';
import { RepublicasController } from './republicas.controller';
import { RepublicasService } from './republicas.service';

@Module({
  controllers: [RepublicasController],
  providers: [RepublicasService],
})
export class RepublicasModule {}
