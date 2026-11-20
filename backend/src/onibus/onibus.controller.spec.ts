import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { OnibusController } from './onibus.controller.js';
import { OnibusService } from './onibus.service.js';

describe('OnibusController', () => {
  let controller: OnibusController;

  const onibusServiceMock = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnibusController],
      providers: [
        {
          provide: OnibusService,
          useValue: onibusServiceMock,
        },
      ],
    }).compile();

    controller = module.get<OnibusController>(OnibusController);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});