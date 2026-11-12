import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';

  import { Rota } from './rota.entity.js';
  import { Localizacao } from './localizacao.entity.js';
  import { StatusOnibus } from './enums.js';

  @Entity({ name: 'Onibus' })
  export class Onibus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    placa: string;

    @Column({ type: 'text', unique: true })
    identificacaoRFID: string;

    @Column({ type: 'text' })
    modelo: string;

    @Column({
      type: 'text',
      default: StatusOnibus.ATIVO,
    })
    status: StatusOnibus;

    @Column({ type: 'integer', nullable: true })
    rotaId: number | null;

    @ManyToOne(() => Rota, (rota) => rota.onibus, {
      nullable: true,
      onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'rotaId' })
    rota: Rota | null;

    @OneToMany(
      () => Localizacao,
      (localizacao) => localizacao.onibus,
    )
    localizacoes: Localizacao[];
  }
