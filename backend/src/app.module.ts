import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthController, RootController } from './health.controller';
import { RepublicasModule } from './republicas/republicas.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, RepublicasModule],
  controllers: [RootController, HealthController],
})
export class AppModule {}
