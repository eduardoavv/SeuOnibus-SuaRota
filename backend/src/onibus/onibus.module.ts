
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Onibus } from '../database/entities/onibus.entity.js';
import { OnibusController } from './onibus.controller.js';
import { OnibusService } from './onibus.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Onibus])],
  controllers: [OnibusController],
  providers: [OnibusService],
})
export class OnibusModule {}
