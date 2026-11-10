
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private totalConsultas = 0;

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
    });

    this.$on('query', (evento) => {
      this.totalConsultas++;

      this.logger.log(
        `[SQL ${this.totalConsultas}] ${evento.query}\n` +
        `Duração: ${evento.duration}ms`,
      );
    });
  }

  resetQueryCount() {
    this.totalConsultas = 0;
  }

  getQueryCount() {
    return this.totalConsultas;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
