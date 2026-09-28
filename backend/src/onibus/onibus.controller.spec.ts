import { Test, TestingModule } from '@nestjs/testing';
import { OnibusController } from './onibus.controller.js';

describe('OnibusController', () => {
  let controller: OnibusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnibusController],
    }).compile();

    controller = module.get<OnibusController>(OnibusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
