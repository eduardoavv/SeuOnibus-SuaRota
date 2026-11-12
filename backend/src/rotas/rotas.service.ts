
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Rota } from '../database/entities/rota.entity.js';
import { CreateRotasDto } from './dto/create-rotas.dto.js';
import { UpdateRotasDto } from './dto/update-rotas.dto.js';

interface FiltrosRotas {
  page?: string;
  limit?: string;
  nome?: string;
}

@Injectable()
export class RotasService {
  constructor(
    @InjectRepository(Rota)
    private readonly rotaRepository: Repository<Rota>,
  ) {}

  async create(data: CreateRotasDto) {
    const rota = this.rotaRepository.create(data);
    return this.rotaRepository.save(rota);
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
      ? { nome: ILike(`%${filtros.nome}%`) }
      : {};

    const [dados, total] = await this.rotaRepository.findAndCount({
      where,
      relations: {
        onibus: true,
        paradas: true,
      },
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
    const rota = await this.rotaRepository.findOneBy({ id });

    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }

    return rota;
  }

  async update(id: number, data: UpdateRotasDto) {
    const rota = await this.findOne(id);

    this.rotaRepository.merge(rota, data);

    return this.rotaRepository.save(rota);
  }

  async remove(id: number) {
    const rota = await this.findOne(id);

    await this.rotaRepository.remove(rota);

    return rota;
  }
}
