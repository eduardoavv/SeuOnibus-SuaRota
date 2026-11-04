
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOnibusDto } from './dto/create-onibus.dto.js';
import { UpdateOnibusDto } from './dto/update-onibus.dto.js';

@Injectable()
export class OnibusService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOnibusDto: CreateOnibusDto) {
    return this.prisma.onibus.create({
      data: createOnibusDto,
    });
  }

  findAll() {
    return this.prisma.onibus.findMany();
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
