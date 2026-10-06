import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRotasDto } from './dto/create-rotas.dto.js';
import { UpdateRotasDto } from './dto/update-rotas.dto.js';

// ... resto do código continua igual
@Injectable()
export class RotasService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateRotasDto) {
    return this.prisma.rota.create({
      data,
    });
  }

  findAll() {
    return this.prisma.rota.findMany();
  }

  findOne(id: number) {
    return this.prisma.rota.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateRotasDto) {
    return this.prisma.rota.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.rota.delete({
      where: { id },
    });
  }
}