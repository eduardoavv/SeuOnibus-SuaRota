
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Localizacao } from '../database/entities/localizacao.entity.js';
import { Onibus } from '../database/entities/onibus.entity.js';
import { LocalizacaoController } from './localizacao.controller.js';
import { LocalizacaoService } from './localizacao.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Localizacao, Onibus])],
  controllers: [LocalizacaoController],
  providers: [LocalizacaoService],
})
export class LocalizacaoModule {}
