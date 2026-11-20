import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OnibusService } from './onibus.service.js';
import { Onibus } from '../database/entities/onibus.entity.js';

describe('OnibusService', () => {
  let service: OnibusService;

  const onibusRepositoryMock = {
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
        OnibusService,
        {
          provide: getRepositoryToken(Onibus),
          useValue: onibusRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<OnibusService>(OnibusService);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});