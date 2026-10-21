
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRotasDto } from './dto/create-rotas.dto.js';
import { UpdateRotasDto } from './dto/update-rotas.dto.js';

@Injectable()
export class RotasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRotasDto) {
    return this.prisma.rota.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.rota.findMany();
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
