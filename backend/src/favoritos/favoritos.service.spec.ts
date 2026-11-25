
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { FavoritosService } from './favoritos.service.js';
import { UsuarioFavoritaRota } from '../database/entities/usuario-favorita-rota.entity.js';
import { Usuario } from '../database/entities/usuario.entity.js';
import { Rota } from '../database/entities/rota.entity.js';

describe('FavoritosService', () => {
  let service: FavoritosService;

  const favoritoRepositoryMock = {
    find: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
  };

  const usuarioRepositoryMock = {
    findOneBy: vi.fn(),
  };

  const rotaRepositoryMock = {
    findOneBy: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritosService,
        {
          provide: getRepositoryToken(UsuarioFavoritaRota),
          useValue: favoritoRepositoryMock,
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: usuarioRepositoryMock,
        },
        {
          provide: getRepositoryToken(Rota),
          useValue: rotaRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FavoritosService>(FavoritosService);

    vi.resetAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve listar os favoritos de um usuário', async () => {
    const favoritos = [
      { usuarioId: 1, rotaId: 2, notificarAtraso: true },
    ];

    usuarioRepositoryMock.findOneBy.mockResolvedValue({ id: 1 });
    favoritoRepositoryMock.find.mockResolvedValue(favoritos);

    const resultado = await service.findAll(1);

    expect(resultado).toEqual(favoritos);
    expect(favoritoRepositoryMock.find).toHaveBeenCalled();
  });

  it('deve lançar erro quando o usuário não existir ao listar favoritos', async () => {
    usuarioRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(service.findAll(1)).rejects.toThrow(NotFoundException);
  });

  it('deve favoritar uma rota com sucesso', async () => {
    const usuario = { id: 1 };
    const rota = { id: 2 };
    const favorito = {
      usuarioId: 1,
      rotaId: 2,
      notificarAtraso: true,
      usuario,
      rota,
    };

    usuarioRepositoryMock.findOneBy.mockResolvedValue(usuario);
    rotaRepositoryMock.findOneBy.mockResolvedValue(rota);
    favoritoRepositoryMock.findOneBy.mockResolvedValue(null);
    favoritoRepositoryMock.create.mockReturnValue(favorito);
    favoritoRepositoryMock.save.mockResolvedValue(favorito);

    const resultado = await service.create({
      usuarioId: 1,
      rotaId: 2,
    });

    expect(resultado).toEqual(favorito);
    expect(favoritoRepositoryMock.save).toHaveBeenCalled();
  });

  it('deve impedir que uma rota seja favoritada duas vezes', async () => {
    usuarioRepositoryMock.findOneBy.mockResolvedValue({ id: 1 });
    rotaRepositoryMock.findOneBy.mockResolvedValue({ id: 2 });
    favoritoRepositoryMock.findOneBy.mockResolvedValue({
      usuarioId: 1,
      rotaId: 2,
    });

    await expect(
      service.create({ usuarioId: 1, rotaId: 2 }),
    ).rejects.toThrow(ConflictException);
  });

  it('deve lançar erro quando a rota não existir', async () => {
    usuarioRepositoryMock.findOneBy.mockResolvedValue({ id: 1 });
    rotaRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(
      service.create({ usuarioId: 1, rotaId: 2 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve remover uma rota dos favoritos', async () => {
    const favorito = { usuarioId: 1, rotaId: 2 };

    favoritoRepositoryMock.findOneBy.mockResolvedValue(favorito);
    favoritoRepositoryMock.remove.mockResolvedValue(favorito);

    const resultado = await service.remove(1, 2);

    expect(resultado).toEqual({
      mensagem: 'Rota removida dos favoritos',
    });
    expect(favoritoRepositoryMock.remove).toHaveBeenCalledWith(favorito);
  });

  it('deve atualizar a configuração de notificação', async () => {
    const favorito = {
      usuarioId: 1,
      rotaId: 2,
      notificarAtraso: true,
    };

    favoritoRepositoryMock.findOneBy.mockResolvedValue(favorito);
    favoritoRepositoryMock.save.mockImplementation(async (dados) => dados);

    const resultado = await service.updateNotificacao(1, 2, false);

    expect(resultado.notificarAtraso).toBe(false);
    expect(favoritoRepositoryMock.save).toHaveBeenCalled();
  });
});
