import { Module } from '@nestjs/common';

import { OnibusController } from './onibus.controller.js';
import { OnibusService } from './onibus.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [OnibusController],
  providers: [OnibusService],
})
export class OnibusModule {}