
import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  
  import { PrismaService } from '../prisma/prisma.service.js';
  import { CreateLocalizacaoDto } from './dto/create-localizacao.dto.js';
  import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto.js';
  
  interface FiltrosLocalizacao {
    page?: string;
    limit?: string;
    onibusId?: string;
  }
  
  @Injectable()
  export class LocalizacaoService {
    constructor(private readonly prisma: PrismaService) {}
  
    async create(data: CreateLocalizacaoDto) {
      const onibus = await this.prisma.onibus.findUnique({
        where: { id: data.onibusId },
      });
  
      if (!onibus) {
        throw new NotFoundException('Ônibus não encontrado');
      }
  
      return this.prisma.localizacao.create({
        data,
      });
    }
  
    async findAll(filtros: FiltrosLocalizacao = {}) {
      const page =
        filtros.page === undefined ? 1 : Number(filtros.page);
  
      const limit =
        filtros.limit === undefined ? 10 : Number(filtros.limit);
  
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
  
      let onibusId: number | undefined;
  
      if (filtros.onibusId !== undefined) {
        onibusId = Number(filtros.onibusId);
  
        if (!Number.isInteger(onibusId) || onibusId < 1) {
          throw new BadRequestException(
            'O ID do ônibus deve ser um número inteiro positivo.',
          );
        }
      }
  
      const where = onibusId !== undefined
        ? { onibusId }
        : {};
  
      const skip = (page - 1) * limit;
  
      const [dados, total] = await Promise.all([
        this.prisma.localizacao.findMany({
          where,
          include: {
            onibus: true,
          },
          orderBy: {
            registradaEm: 'desc',
          },
          skip,
          take: limit,
        }),
  
        this.prisma.localizacao.count({ where }),
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
      const localizacao = await this.prisma.localizacao.findUnique({
        where: { id },
        include: {
          onibus: true,
        },
      });
  
      if (!localizacao) {
        throw new NotFoundException('Localização não encontrada');
      }
  
      return localizacao;
    }
  
    async update(id: number, data: UpdateLocalizacaoDto) {
      await this.findOne(id);
  
      if (data.onibusId !== undefined) {
        const onibus = await this.prisma.onibus.findUnique({
          where: { id: data.onibusId },
        });
  
        if (!onibus) {
          throw new NotFoundException('Ônibus não encontrado');
        }
      }
  
      return this.prisma.localizacao.update({
        where: { id },
        data,
      });
    }
  
    async remove(id: number) {
      await this.findOne(id);
  
      return this.prisma.localizacao.delete({
        where: { id },
      });
    }
  }