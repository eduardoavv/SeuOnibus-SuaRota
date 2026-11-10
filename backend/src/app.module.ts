import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { ParadasModule } from './paradas/paradas.module.js';
import { RotasModule } from './rotas/rotas.module.js';
import { OnibusModule } from './onibus/onibus.module.js';
import { LocalizacaoModule } from './localizacao/localizacao.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter.js';

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
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}