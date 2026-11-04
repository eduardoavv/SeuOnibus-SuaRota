
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRotasDto } from './dto/create-rotas.dto.js';
import { UpdateRotasDto } from './dto/update-rotas.dto.js';

interface FiltrosRotas {
  page?: string;
  limit?: string;
  nome?: string;
}

@Injectable()
export class RotasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRotasDto) {
    return this.prisma.rota.create({
      data,
    });
  }

  async findAll(filtros: FiltrosRotas = {}) {
    const page = Number(filtros.page ?? 1);
    const limit = Number(filtros.limit ?? 10);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      throw new BadRequestException(
        'Página ou limite inválido. O limite máximo é 100.',
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

    const [rotas, total] = await Promise.all([
      this.prisma.rota.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.rota.count({ where }),
    ]);

    return {
      dados: rotas,
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const rota = await this.prisma.rota.findUnique({
      where: { id },
    });

    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }

    return rota;
  }

  async update(id: number, data: UpdateRotasDto) {
    await this.findOne(id);

    return this.prisma.rota.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.rota.delete({
      where: { id },
    });
  }
}
