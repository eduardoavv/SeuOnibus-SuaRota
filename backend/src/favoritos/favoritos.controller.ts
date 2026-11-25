
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
  } from '@nestjs/common';

  import { FavoritosService } from './favoritos.service.js';
  import { CreateFavoritoDto } from './dto/create-favorito.dto.js';
  import { UpdateNotificacaoDto } from './dto/update-notificacao.dto.js';

  @Controller('favoritos')
  export class FavoritosController {
    constructor(private readonly favoritosService: FavoritosService) {}

    @Get(':usuarioId')
    findAll(
      @Param('usuarioId', ParseIntPipe) usuarioId: number,
    ) {
      return this.favoritosService.findAll(usuarioId);
    }

    @Post()
    create(@Body() data: CreateFavoritoDto) {
      return this.favoritosService.create(data);
    }

    @Delete(':usuarioId/:rotaId')
    remove(
      @Param('usuarioId', ParseIntPipe) usuarioId: number,
      @Param('rotaId', ParseIntPipe) rotaId: number,
    ) {
      return this.favoritosService.remove(usuarioId, rotaId);
    }

    @Patch(':usuarioId/:rotaId/notificacao')
    updateNotificacao(
      @Param('usuarioId', ParseIntPipe) usuarioId: number,
      @Param('rotaId', ParseIntPipe) rotaId: number,
      @Body() data: UpdateNotificacaoDto,
    ) {
      return this.favoritosService.updateNotificacao(
        usuarioId,
        rotaId,
        data.notificarAtraso,
      );
    }
  }
