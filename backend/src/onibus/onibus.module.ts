import { Module } from '@nestjs/common';
import { OnibusController } from './onibus.controller.js';
import { OnibusService } from './onibus.service.js';

@Module({
  controllers: [OnibusController],
  providers: [OnibusService]
})
export class OnibusModule {}
