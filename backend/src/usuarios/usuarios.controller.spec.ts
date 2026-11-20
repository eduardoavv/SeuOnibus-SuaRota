import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { UsuariosController } from './usuarios.controller.js';
import { UsuariosService } from './usuarios.service.js';

describe('UsuariosController', () => {
  let controller: UsuariosController;

  const usuariosServiceMock = {
    criar: vi.fn(),
    listar: vi.fn(),
    buscarPorId: vi.fn(),
    atualizar: vi.fn(),
    excluir: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: usuariosServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});