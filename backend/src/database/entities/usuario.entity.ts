import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';

  import { UsuarioFavoritaRota } from './usuario-favorita-rota.entity.js';
  import { TipoUsuario } from './enums.js';

  @Entity({ name: 'Usuario' })
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nome: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text' })
    senha: string;

    @Column({
      type: 'text',
      default: TipoUsuario.ALUNO,
    })
    tipo: TipoUsuario;

    @OneToMany(
      () => UsuarioFavoritaRota,
      (favorita) => favorita.usuario,
    )
    rotasFavoritas: UsuarioFavoritaRota[];
  }
