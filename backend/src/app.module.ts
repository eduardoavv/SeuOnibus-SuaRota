import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OnibusModule } from './onibus/onibus.module.js';

@Module({
  imports: [OnibusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
