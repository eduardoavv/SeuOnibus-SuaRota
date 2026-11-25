
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Parada } from '../database/entities/parada.entity.js';
import { Rota } from '../database/entities/rota.entity.js';
import { ParadasController } from './paradas.controller.js';
import { ParadasService } from './paradas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Parada, Rota])],
  controllers: [ParadasController],
  providers: [ParadasService],
})
export class ParadasModule {}
