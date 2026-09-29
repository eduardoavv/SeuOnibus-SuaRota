import { Module } from '@nestjs/common';
import { RotasController } from './rotas.controller';
import { RotasService } from './rotas.service';

@Module({
  controllers: [RotasController],
  providers: [RotasService],
})
export class RotasModule {}