
import {
    Injectable,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';

  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';

  import { UsuarioFavoritaRota } from '../database/entities/usuario-favorita-rota.entity.js';
  import { Usuario } from '../database/entities/usuario.entity.js';
  import { Rota } from '../database/entities/rota.entity.js';

  import { CreateFavoritoDto } from './dto/create-favorito.dto.js';

  @Injectable()
  export class FavoritosService {
    constructor(
      @InjectRepository(UsuarioFavoritaRota)
      private readonly favoritoRepository: Repository<UsuarioFavoritaRota>,

      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>,

      @InjectRepository(Rota)
      private readonly rotaRepository: Repository<Rota>,
    ) {}

    async findAll(usuarioId: number) {
      const usuario = await this.usuarioRepository.findOneBy({
        id: usuarioId,
      });

      if (!usuario) {
        throw new NotFoundException('UsuÃ¡rio nÃ£o encontrado');
      }

      return this.favoritoRepository.find({
        where: { usuarioId },
        relations: { rota: true },
        order: { criadoEm: 'DESC' },
      });
    }

    async create(data: CreateFavoritoDto) {
      const usuario = await this.usuarioRepository.findOneBy({
        id: data.usuarioId,
      });

      if (!usuario) {
        throw new NotFoundException('UsuÃ¡rio nÃ£o encontrado');
      }

      const rota = await this.rotaRepository.findOneBy({
        id: data.rotaId,
      });

      if (!rota) {
        throw new NotFoundException('Rota nÃ£o encontrada');
      }

      const existente = await this.favoritoRepository.findOneBy({
        usuarioId: data.usuarioId,
        rotaId: data.rotaId,
      });

      if (existente) {
        throw new ConflictException('Esta rota jÃ¡ estÃ¡ favoritada');
      }

      const favorito = this.favoritoRepository.create({
        usuarioId: data.usuarioId,
        rotaId: data.rotaId,
        notificarAtraso: data.notificarAtraso ?? true,
        usuario,
        rota,
      });

      return this.favoritoRepository.save(favorito);
    }

    async remove(usuarioId: number, rotaId: number) {
      const favorito = await this.favoritoRepository.findOneBy({
        usuarioId,
        rotaId,
      });

      if (!favorito) {
        throw new NotFoundException('Favorito nÃ£o encontrado');
      }

      await this.favoritoRepository.remove(favorito);

      return {
        mensagem: 'Rota removida dos favoritos',
      };
    }

    async updateNotificacao(
      usuarioId: number,
      rotaId: number,
      notificarAtraso: boolean,
    ) {
      const favorito = await this.favoritoRepository.findOneBy({
        usuarioId,
        rotaId,
      });

      if (!favorito) {
        throw new NotFoundException('Favorito nÃ£o encontrado');
      }

      favorito.notificarAtraso = notificarAtraso;

      return this.favoritoRepository.save(favorito);
    }
  }
