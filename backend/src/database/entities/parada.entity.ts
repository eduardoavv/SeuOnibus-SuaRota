
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

  import { Rota } from './rota.entity.js';

  @Entity({ name: 'Parada' })
  export class Parada {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nome: string;

    @Column({ type: 'double precision' })
    latitude: number;

    @Column({ type: 'double precision' })
    longitude: number;

    @Column({ type: 'integer', nullable: true })
    rotaId: number | null;

    @ManyToOne(() => Rota, (rota) => rota.paradas, {
      nullable: true,
      onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'rotaId' })
    rota: Rota | null;
  }
