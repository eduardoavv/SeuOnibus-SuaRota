
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { ParadasService } from './paradas.service.js';
import { Parada } from '../database/entities/parada.entity.js';
import { Rota } from '../database/entities/rota.entity.js';

describe('ParadasService', () => {
  let service: ParadasService;

  const paradaRepositoryMock = {
    findAndCount: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    merge: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
  };

  const rotaRepositoryMock = {
    findOneBy: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParadasService,
        {
          provide: getRepositoryToken(Parada),
          useValue: paradaRepositoryMock,
        },
        {
          provide: getRepositoryToken(Rota),
          useValue: rotaRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ParadasService>(ParadasService);

    vi.resetAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve listar as paradas com paginação', async () => {
    const paradas = [{ id: 1, nome: 'Centro' }];

    paradaRepositoryMock.findAndCount.mockResolvedValue([
      paradas,
      1,
    ]);

    const resultado = await service.findAll();

    expect(resultado.dados).toEqual(paradas);
    expect(resultado.total).toBe(1);
    expect(resultado.pagina).toBe(1);
  });

  it('deve rejeitar paginação inválida', async () => {
    await expect(
      service.findAll({ page: '0' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve rejeitar rotaId inválido', async () => {
    await expect(
      service.findAll({ rotaId: 'abc' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve buscar uma parada por rota', async () => {
    paradaRepositoryMock.findAndCount.mockResolvedValue([
      [{ id: 1, nome: 'Centro', rotaId: 2 }],
      1,
    ]);

    const resultado = await service.findAll({ rotaId: '2' });

    expect(resultado.dados).toHaveLength(1);
    expect(paradaRepositoryMock.findAndCount).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { rotaId: 2 },
      }),
    );
  });

  it('deve buscar uma parada por ID', async () => {
    const parada = { id: 1, nome: 'Centro' };

    paradaRepositoryMock.findOneBy.mockResolvedValue(parada);

    const resultado = await service.findOne(1);

    expect(resultado).toEqual(parada);
  });

  it('deve lançar erro quando a parada não existir', async () => {
    paradaRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('deve criar uma parada vinculada a uma rota', async () => {
    const rota = { id: 2 };
    const parada = {
      nome: 'Centro',
      latitude: -8.1,
      longitude: -35.1,
      rotaId: 2,
      rota,
    };

    rotaRepositoryMock.findOneBy.mockResolvedValue(rota);
    paradaRepositoryMock.create.mockReturnValue(parada);
    paradaRepositoryMock.save.mockResolvedValue(parada);

    const resultado = await service.create({
      nome: 'Centro',
      latitude: -8.1,
      longitude: -35.1,
      rotaId: 2,
    });

    expect(resultado).toEqual(parada);
    expect(paradaRepositoryMock.save).toHaveBeenCalled();
  });

  it('deve lançar erro ao criar parada com rota inexistente', async () => {
    rotaRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(
      service.create({
        nome: 'Centro',
        latitude: -8.1,
        longitude: -35.1,
        rotaId: 2,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve remover uma parada', async () => {
    const parada = { id: 1, nome: 'Centro' };

    paradaRepositoryMock.findOneBy.mockResolvedValue(parada);
    paradaRepositoryMock.remove.mockResolvedValue(parada);

    const resultado = await service.remove(1);

    expect(resultado).toEqual(parada);
    expect(paradaRepositoryMock.remove).toHaveBeenCalledWith(parada);
  });
});
