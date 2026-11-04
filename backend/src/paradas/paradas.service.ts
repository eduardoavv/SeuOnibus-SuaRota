
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateParadaDto } from './dto/create-parada.dto.js';
import { UpdateParadaDto } from './dto/update-parada.dto.js';

interface FiltrosParadas {
  page?: string;
  limit?: string;
  nome?: string;
}

@Injectable()
export class ParadasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filtros: FiltrosParadas = {}) {
    const page = Number(filtros.page) || 1;
    const limit = Number(filtros.limit) || 10;

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      throw new BadRequestException(
        'Página e limite devem ser números inteiros positivos. O limite máximo é 100.',
      );
    }

    const where = filtros.nome
      ? {
          nome: {
            contains: filtros.nome,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [dados, total] = await Promise.all([
      this.prisma.parada.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.parada.count({ where }),
    ]);

    return {
      dados,
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const parada = await this.prisma.parada.findUnique({
      where: { id },
    });

    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }

    return parada;
  }

  async create(data: CreateParadaDto) {
    return this.prisma.parada.create({
      data,
    });
  }

  async update(id: number, data: UpdateParadaDto) {
    await this.findOne(id);

    return this.prisma.parada.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.parada.delete({
      where: { id },
    });
  }
}
