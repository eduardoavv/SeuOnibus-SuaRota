import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  type Relation,
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
  onibus: Relation<Onibus[]>;

  @OneToMany(() => Parada, (parada) => parada.rota)
  paradas: Relation<Parada[]>;

  @OneToMany(
    () => UsuarioFavoritaRota,
    (favorita) => favorita.rota,
  )
  favoritas: Relation<UsuarioFavoritaRota[]>;
}