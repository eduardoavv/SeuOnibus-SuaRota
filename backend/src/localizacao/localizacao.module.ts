
import { Module } from '@nestjs/common';

import { LocalizacaoController } from './localizacao.controller.js';
import { LocalizacaoService } from './localizacao.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [LocalizacaoController],
  providers: [LocalizacaoService],
})
export class LocalizacaoModule {}
