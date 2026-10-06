import { Injectable } from '@nestjs/common';
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
    return this.prisma.parada.findUnique({
      where: { id },
    });
  }

  async create(data: CreateParadaDto) {
    return this.prisma.parada.create({
      data,
    });
  }

  async update(id: number, data: UpdateParadaDto) {
    return this.prisma.parada.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.parada.delete({
      where: { id },
    });
  }
}