
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Localizacao } from '../database/entities/localizacao.entity.js';
import { Onibus } from '../database/entities/onibus.entity.js';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto.js';
import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto.js';

interface FiltrosLocalizacao {
  page?: string;
  limit?: string;
  onibusId?: string;
}

@Injectable()
export class LocalizacaoService {
  constructor(
    @InjectRepository(Localizacao)
    private readonly localizacaoRepository: Repository<Localizacao>,

    @InjectRepository(Onibus)
    private readonly onibusRepository: Repository<Onibus>,
  ) {}

  async create(data: CreateLocalizacaoDto) {
    const onibus = await this.onibusRepository.findOneBy({
      id: data.onibusId,
    });

    if (!onibus) {
      throw new NotFoundException('Ônibus não encontrado');
    }

    const localizacao = this.localizacaoRepository.create(data);

    return this.localizacaoRepository.save(localizacao);
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

    const where = onibusId !== undefined ? { onibusId } : {};

    const [dados, total] =
      await this.localizacaoRepository.findAndCount({
        where,
        relations: { onibus: true },
        skip: (page - 1) * limit,
        take: limit,
        order: { registradaEm: 'DESC' },
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
    const localizacao = await this.localizacaoRepository.findOne({
      where: { id },
      relations: { onibus: true },
    });

    if (!localizacao) {
      throw new NotFoundException('Localização não encontrada');
    }

    return localizacao;
  }

  async update(id: number, data: UpdateLocalizacaoDto) {
    const localizacao = await this.findOne(id);

    if (data.onibusId !== undefined) {
      const onibus = await this.onibusRepository.findOneBy({
        id: data.onibusId,
      });

      if (!onibus) {
        throw new NotFoundException('Ônibus não encontrado');
      }
    }

    this.localizacaoRepository.merge(localizacao, data);

    return this.localizacaoRepository.save(localizacao);
  }

  async remove(id: number) {
    const localizacao = await this.findOne(id);

    await this.localizacaoRepository.remove(localizacao);

    return localizacao;
  }
}
