
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
  } from 'typeorm';

  import { Onibus } from './onibus.entity.js';

  @Entity({ name: 'Localizacao' })
  @Index('Localizacao_onibusId_registradaEm_idx', [
    'onibusId',
    'registradaEm',
  ])
  export class Localizacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double precision' })
    latitude: number;

    @Column({ type: 'double precision' })
    longitude: number;

    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    registradaEm: Date;

    @Column({ type: 'integer' })
    onibusId: number;

    @ManyToOne(
      () => Onibus,
      (onibus) => onibus.localizacoes,
      { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'onibusId' })
    onibus: Onibus;
  }
