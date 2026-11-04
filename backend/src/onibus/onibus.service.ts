

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOnibusDto } from './dto/create-onibus.dto.js';
import { UpdateOnibusDto } from './dto/update-onibus.dto.js';

interface FiltrosOnibus {
  page?: string;
  limit?: string;
  status?: string;
  placa?: string;
}

@Injectable()
export class OnibusService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOnibusDto: CreateOnibusDto) {
    return this.prisma.onibus.create({
      data: createOnibusDto,
    });
  }

  async findAll(filtros: FiltrosOnibus = {}) {
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

    if (
      filtros.status &&
      !['ATIVO', 'INATIVO'].includes(filtros.status)
    ) {
      throw new BadRequestException('Status inválido.');
    }

    const where = {
      ...(filtros.status ? { status: filtros.status } : {}),
      ...(filtros.placa
        ? { placa: { contains: filtros.placa } }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [onibus, total] = await Promise.all([
      this.prisma.onibus.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.onibus.count({ where }),
    ]);

    return {
      dados: onibus,
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const onibus = await this.prisma.onibus.findUnique({
      where: { id },
    });

    if (!onibus) {
      throw new NotFoundException('Ônibus não encontrado');
    }

    return onibus;
  }

  async update(id: number, updateOnibusDto: UpdateOnibusDto) {
    await this.findOne(id);

    return this.prisma.onibus.update({
      where: { id },
      data: updateOnibusDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.onibus.delete({
      where: { id },
    });
  }
}
