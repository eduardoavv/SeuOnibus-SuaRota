
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Parada } from '../database/entities/parada.entity.js';
import { Rota } from '../database/entities/rota.entity.js';
import { CreateParadaDto } from './dto/create-parada.dto.js';
import { UpdateParadaDto } from './dto/update-parada.dto.js';

interface FiltrosParadas {
  page?: string;
  limit?: string;
  nome?: string;
  rotaId?: string;
}

@Injectable()
export class ParadasService {
  constructor(
    @InjectRepository(Parada)
    private readonly paradaRepository: Repository<Parada>,
    @InjectRepository(Rota)
    private readonly rotaRepository: Repository<Rota>,
  ) {}

  async findAll(filtros: FiltrosParadas = {}) {
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
        'Página e limite devem ser números inteiros positivos. O limite máximo é 100.',
      );
    }

    let rotaId: number | undefined;

    if (filtros.rotaId !== undefined && filtros.rotaId !== '') {
      rotaId = Number(filtros.rotaId);

      if (!Number.isInteger(rotaId) || rotaId < 1) {
        throw new BadRequestException('rotaId inválido.');
      }
    }

    const where: {
      nome?: ReturnType<typeof ILike>;
      rotaId?: number;
    } = {};

    if (filtros.nome) {
      where.nome = ILike(`%${filtros.nome}%`);
    }

    if (rotaId !== undefined) {
      where.rotaId = rotaId;
    }

    const [dados, total] = await this.paradaRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      dados,
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const parada = await this.paradaRepository.findOneBy({ id });

    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }

    return parada;
  }

  async create(data: CreateParadaDto) {
    const parada = this.paradaRepository.create(data);

    if (data.rotaId != null) {
      const rota = await this.rotaRepository.findOneBy({
        id: data.rotaId,
      });

      if (!rota) {
        throw new NotFoundException('Rota não encontrada');
      }

      parada.rota = rota;
    }

    return this.paradaRepository.save(parada);
  }

  async update(id: number, data: UpdateParadaDto) {
    const parada = await this.findOne(id);
    const { rotaId, ...dados } = data;

    this.paradaRepository.merge(parada, dados);

    if (rotaId !== undefined) {
      if (rotaId === null) {
        parada.rota = null;
      } else {
        const rota = await this.rotaRepository.findOneBy({
          id: rotaId,
        });

        if (!rota) {
          throw new NotFoundException('Rota não encontrada');
        }

        parada.rota = rota;
      }
    }

    return this.paradaRepository.save(parada);
  }

  async remove(id: number) {
    const parada = await this.findOne(id);

    await this.paradaRepository.remove(parada);

    return parada;
  }
}
