
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Onibus } from '../database/entities/onibus.entity.js';
import { StatusOnibus } from '../database/entities/enums.js';
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
  constructor(
    @InjectRepository(Onibus)
    private readonly onibusRepository: Repository<Onibus>,
  ) {}

  async create(data: CreateOnibusDto) {
    const onibus = this.onibusRepository.create({
      ...data,
      status: data.status as StatusOnibus,
    });

    return this.onibusRepository.save(onibus);
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
      !Object.values(StatusOnibus).includes(
        filtros.status as StatusOnibus,
      )
    ) {
      throw new BadRequestException('Status inválido.');
    }

    const where = {
      ...(filtros.status
        ? { status: filtros.status as StatusOnibus }
        : {}),
      ...(filtros.placa
        ? { placa: ILike(`%${filtros.placa}%`) }
        : {}),
    };

    const [dados, total] = await this.onibusRepository.findAndCount({
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
    const onibus = await this.onibusRepository.findOneBy({ id });

    if (!onibus) {
      throw new NotFoundException('Ônibus não encontrado');
    }

    return onibus;
  }

  async update(id: number, data: UpdateOnibusDto) {
    const onibus = await this.findOne(id);

    this.onibusRepository.merge(onibus, {
      ...data,
      ...(data.status
        ? { status: data.status as StatusOnibus }
        : {}),
    });

    return this.onibusRepository.save(onibus);
  }

  async remove(id: number) {
    const onibus = await this.findOne(id);

    await this.onibusRepository.remove(onibus);

    return onibus;
  }
}
