import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { LocalizacaoService } from './localizacao.service.js';
import { Localizacao } from '../database/entities/localizacao.entity.js';
import { Onibus } from '../database/entities/onibus.entity.js';

describe('LocalizacaoService', () => {
  let service: LocalizacaoService;

  const localizacaoRepository = {
    create: vi.fn(),
    save: vi.fn(),
    findOne: vi.fn(),
  };

  const onibusRepository = {
    findOneBy: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalizacaoService,
        {
          provide: getRepositoryToken(Localizacao),
          useValue: localizacaoRepository,
        },
        {
          provide: getRepositoryToken(Onibus),
          useValue: onibusRepository,
        },
      ],
    }).compile();

    service = module.get<LocalizacaoService>(LocalizacaoService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve salvar localização usando o RFID do ônibus', async () => {
    const onibus = {
      id: 1,
      identificacaoRFID: 'RFID-001',
    };

    const dados = {
      identificacaoRFID: 'RFID-001',
      latitude: -8.2835,
      longitude: -35.9765,
    };

    const localizacao = {
      latitude: dados.latitude,
      longitude: dados.longitude,
      onibusId: 1,
    };

    onibusRepository.findOneBy.mockResolvedValue(onibus);
    localizacaoRepository.create.mockReturnValue(localizacao);
    localizacaoRepository.save.mockResolvedValue({
      id: 1,
      ...localizacao,
    });

    const resultado = await service.createByRfid(dados);

    expect(onibusRepository.findOneBy).toHaveBeenCalledWith({
      identificacaoRFID: 'RFID-001',
    });

    expect(localizacaoRepository.save).toHaveBeenCalledWith(localizacao);
    expect(resultado.onibusId).toBe(1);
  });

  it('deve retornar erro quando o RFID não encontrar um ônibus', async () => {
    onibusRepository.findOneBy.mockResolvedValue(null);

    await expect(
      service.createByRfid({
        identificacaoRFID: 'RFID-999',
        latitude: -8.2835,
        longitude: -35.9765,
      }),
    ).rejects.toThrow(NotFoundException);

    expect(localizacaoRepository.save).not.toHaveBeenCalled();
  });
  it('deve retornar a última localização do ônibus pelo RFID', async () => {
  const onibus = {
    id: 1,
    identificacaoRFID: 'RFID-001',
  };

  const localizacao = {
    id: 2,
    latitude: -8.2835,
    longitude: -35.9765,
    onibusId: 1,
  };

  onibusRepository.findOneBy.mockResolvedValue(onibus);
  localizacaoRepository.findOne.mockResolvedValue(localizacao);

  const resultado = await service.findLatestByRfid('RFID-001');

  expect(onibusRepository.findOneBy).toHaveBeenCalledWith({
    identificacaoRFID: 'RFID-001',
  });

  expect(localizacaoRepository.findOne).toHaveBeenCalledWith({
    where: { onibusId: 1 },
    relations: { onibus: true },
    order: { registradaEm: 'DESC' },
  });

  expect(resultado).toEqual(localizacao);
});

it('deve retornar erro quando o ônibus não possui localização', async () => {
  onibusRepository.findOneBy.mockResolvedValue({
    id: 1,
    identificacaoRFID: 'RFID-001',
  });

  localizacaoRepository.findOne.mockResolvedValue(null);

  await expect(
    service.findLatestByRfid('RFID-001'),
  ).rejects.toThrow(NotFoundException);
});
});