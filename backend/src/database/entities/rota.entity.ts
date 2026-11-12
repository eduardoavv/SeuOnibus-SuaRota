
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';

  import { Onibus } from './onibus.entity.js';
  import { Parada } from './parada.entity.js';
  import { UsuarioFavoritaRota } from './usuario-favorita-rota.entity.js';

  @Entity({ name: 'Rota' })
  export class Rota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nome: string;

    @Column({ type: 'text', nullable: true })
    descricao: string | null;

    @OneToMany(() => Onibus, (onibus) => onibus.rota)
    onibus: Onibus[];

    @OneToMany(() => Parada, (parada) => parada.rota)
    paradas: Parada[];

    @OneToMany(
      () => UsuarioFavoritaRota,
      (favorita) => favorita.rota,
    )
    favoritas: UsuarioFavoritaRota[];
  }
