import { Module } from '@nestjs/common';
import { RotasController } from './rotas.controller.js';
import { RotasService } from './rotas.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RotasController],
  providers: [RotasService],
})
export class RotasModule {}