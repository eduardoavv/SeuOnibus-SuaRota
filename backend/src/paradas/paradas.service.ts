
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

import { CreateParadaDto } from './dto/create-parada.dto.js';
import { UpdateParadaDto } from './dto/update-parada.dto.js';

@Injectable()
export class ParadasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.parada.findMany();
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
