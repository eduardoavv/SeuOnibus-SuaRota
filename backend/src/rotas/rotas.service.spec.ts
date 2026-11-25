
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { RotasService } from './rotas.service.js';
import { Rota } from '../database/entities/rota.entity.js';

describe('RotasService', () => {
  let service: RotasService;

  const rotaRepositoryMock = {
    create: vi.fn(),
    save: vi.fn(),
    findAndCount: vi.fn(),
    findOneBy: vi.fn(),
    merge: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RotasService,
        {
          provide: getRepositoryToken(Rota),
          useValue: rotaRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<RotasService>(RotasService);

    vi.resetAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma rota', async () => {
    const dados = { nome: 'Centro', descricao: 'Rota central' };
    const rota = { id: 1, ...dados };

    rotaRepositoryMock.create.mockReturnValue(rota);
    rotaRepositoryMock.save.mockResolvedValue(rota);

    const resultado = await service.create(dados);

    expect(resultado).toEqual(rota);
    expect(rotaRepositoryMock.save).toHaveBeenCalledWith(rota);
  });

  it('deve listar rotas com paginação', async () => {
    const rotas = [{ id: 1, nome: 'Centro' }];

    rotaRepositoryMock.findAndCount.mockResolvedValue([rotas, 1]);

    const resultado = await service.findAll();

    expect(resultado.dados).toEqual(rotas);
    expect(resultado.total).toBe(1);
    expect(resultado.pagina).toBe(1);
    expect(resultado.limite).toBe(10);
  });

  it('deve rejeitar paginação inválida', async () => {
    await expect(
      service.findAll({ page: '0' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve rejeitar limite acima de 100', async () => {
    await expect(
      service.findAll({ limit: '101' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve buscar uma rota por ID', async () => {
    const rota = { id: 1, nome: 'Centro' };

    rotaRepositoryMock.findOneBy.mockResolvedValue(rota);

    const resultado = await service.findOne(1);

    expect(resultado).toEqual(rota);
  });

  it('deve lançar erro quando a rota não existir', async () => {
    rotaRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar uma rota', async () => {
    const rota = { id: 1, nome: 'Centro' };
    const dados = { nome: 'Centro Atualizado' };

    rotaRepositoryMock.findOneBy.mockResolvedValue(rota);
    rotaRepositoryMock.merge.mockImplementation((entidade, novosDados) =>
      Object.assign(entidade, novosDados),
    );
    rotaRepositoryMock.save.mockImplementation(async (entidade) => entidade);

    const resultado = await service.update(1, dados);

    expect(resultado.nome).toBe('Centro Atualizado');
    expect(rotaRepositoryMock.save).toHaveBeenCalled();
  });

  it('deve remover uma rota', async () => {
    const rota = { id: 1, nome: 'Centro' };

    rotaRepositoryMock.findOneBy.mockResolvedValue(rota);
    rotaRepositoryMock.remove.mockResolvedValue(rota);

    const resultado = await service.remove(1);

    expect(resultado).toEqual(rota);
    expect(rotaRepositoryMock.remove).toHaveBeenCalledWith(rota);
  });
});
