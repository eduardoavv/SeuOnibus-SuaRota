
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rota } from './database/entities/rota.entity.js';
import { Onibus } from './database/entities/onibus.entity.js';
import { Parada } from './database/entities/parada.entity.js';
import { Localizacao } from './database/entities/localizacao.entity.js';
import { Usuario } from './database/entities/usuario.entity.js';
import { UsuarioFavoritaRota } from './database/entities/usuario-favorita-rota.entity.js';

import { PostgresExceptionFilter } from './database/postgres-exception.filter.js';

import { ParadasModule } from './paradas/paradas.module.js';
import { RotasModule } from './rotas/rotas.module.js';
import { OnibusModule } from './onibus/onibus.module.js';
import { LocalizacaoModule } from './localizacao/localizacao.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        url: configService.get<string>('DATABASE_URL'),
        entities: [
          Rota,
          Onibus,
          Parada,
          Localizacao,
          Usuario,
          UsuarioFavoritaRota,
        ],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    OnibusModule,
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
      useClass: PostgresExceptionFilter,
    },
  ],
})
export class AppModule {}
