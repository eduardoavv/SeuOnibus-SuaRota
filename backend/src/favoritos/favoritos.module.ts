
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioFavoritaRota } from '../database/entities/usuario-favorita-rota.entity.js';
import { Usuario } from '../database/entities/usuario.entity.js';
import { Rota } from '../database/entities/rota.entity.js';

import { FavoritosController } from './favoritos.controller.js';
import { FavoritosService } from './favoritos.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioFavoritaRota,
      Usuario,
      Rota,
    ]),
  ],
  controllers: [FavoritosController],
  providers: [FavoritosService],
})
export class FavoritosModule {}
