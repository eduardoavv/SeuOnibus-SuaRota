import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

  import { Usuario } from './usuario.entity.js';
  import { Rota } from './rota.entity.js';

  @Entity({ name: 'UsuarioFavoritaRota' })
  export class UsuarioFavoritaRota {
    @PrimaryColumn({ type: 'integer' })
    usuarioId: number;

    @PrimaryColumn({ type: 'integer' })
    rotaId: number;

    @Column({ type: 'boolean', default: true })
    notificarAtraso: boolean;

    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    criadoEm: Date;

    @ManyToOne(
      () => Usuario,
      (usuario) => usuario.rotasFavoritas,
      { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuario;

    @ManyToOne(
      () => Rota,
      (rota) => rota.favoritas,
      { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'rotaId' })
    rota: Rota;
  }
