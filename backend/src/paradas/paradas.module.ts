import { Module } from '@nestjs/common';

import { ParadasController } from './paradas.controller.js';

import { ParadasService } from './paradas.service.js';

import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ParadasController],
  providers: [ParadasService],
})
export class ParadasModule {}