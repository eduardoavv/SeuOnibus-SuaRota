import { Module } from '@nestjs/common';

import { ParadasController } from './paradas.controller';

import { ParadasService } from './paradas.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParadasController],
  providers: [ParadasService],
})
export class ParadasModule {}