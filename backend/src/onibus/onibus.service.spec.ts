import { Test, TestingModule } from '@nestjs/testing';
import { OnibusService } from './onibus.service.js';

describe('OnibusService', () => {
  let service: OnibusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnibusService],
    }).compile();

    service = module.get<OnibusService>(OnibusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
