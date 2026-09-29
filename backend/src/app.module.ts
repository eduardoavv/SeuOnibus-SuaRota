import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ParadasModule } from './paradas/paradas.module';

import { AppController } from './app.controller.js';

import { AppService } from './app.service.js';

import { OnibusModule } from './onibus/onibus.module.js';

import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OnibusModule,
    PrismaModule,
    ParadasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}