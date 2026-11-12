
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UsuariosService } from './usuarios.service.js';
import { Usuario } from '../database/entities/usuario.entity.js';

describe('UsuariosService', () => {
  let service: UsuariosService;

  const usuarioRepositoryMock = {
    findOneBy: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: usuarioRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar true quando a senha estiver correta', async () => {
    const hash = await bcrypt.hash('Senha123', 10);

    usuarioRepositoryMock.findOneBy.mockResolvedValue({
      id: 'usuario-teste',
      email: 'joao.hash@email.com',
      senha: hash,
    });

    const resultado = await service.verificarSenha(
      'joao.hash@email.com',
      'Senha123',
    );

    expect(resultado).toBe(true);
  });

  it('deve retornar false quando a senha estiver incorreta', async () => {
    const hash = await bcrypt.hash('Senha123', 10);

    usuarioRepositoryMock.findOneBy.mockResolvedValue({
      id: 'usuario-teste',
      email: 'joao.hash@email.com',
      senha: hash,
    });

    const resultado = await service.verificarSenha(
      'joao.hash@email.com',
      'SenhaErrada',
    );

    expect(resultado).toBe(false);
  });

  it('deve retornar false quando o usuário não existir', async () => {
    usuarioRepositoryMock.findOneBy.mockResolvedValue(null);

    const resultado = await service.verificarSenha(
      'naoexiste@email.com',
      'Senha123',
    );

    expect(resultado).toBe(false);
  });
});
