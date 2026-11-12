
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rota } from '../database/entities/rota.entity.js';
import { RotasController } from './rotas.controller.js';
import { RotasService } from './rotas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Rota])],
  controllers: [RotasController],
  providers: [RotasService],
})
export class RotasModule {}
