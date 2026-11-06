
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UsuariosService } from './usuarios.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

describe('UsuariosService', () => {
  let service: UsuariosService;

  const prismaMock = {
    usuario: {
      findUnique: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: prismaMock,
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

    prismaMock.usuario.findUnique.mockResolvedValue({
      id: 3,
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

    prismaMock.usuario.findUnique.mockResolvedValue({
      id: 3,
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
    prismaMock.usuario.findUnique.mockResolvedValue(null);

    const resultado = await service.verificarSenha(
      'naoexiste@email.com',
      'Senha123',
    );

    expect(resultado).toBe(false);
  });
});
