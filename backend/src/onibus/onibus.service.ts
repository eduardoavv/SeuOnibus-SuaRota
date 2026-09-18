import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.prisma.onibus.findUnique({
      where: { id },
    });
  }

  update(id: number, updateOnibusDto: UpdateOnibusDto) {
    return this.prisma.onibus.update({
      where: { id },
      data: updateOnibusDto,
    });
  }

  remove(id: number) {
    return this.prisma.onibus.delete({
      where: { id },
    });
  }
}