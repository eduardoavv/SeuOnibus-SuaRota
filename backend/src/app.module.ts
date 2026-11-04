
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ParadasModule } from './paradas/paradas.module.js';
import { RotasModule } from './rotas/rotas.module.js';
import { OnibusModule } from './onibus/onibus.module.js';
import { LocalizacaoModule } from './localizacao/localizacao.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OnibusModule,
    PrismaModule,
    ParadasModule,
    RotasModule,
    LocalizacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
