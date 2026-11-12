import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from '../database/entities/usuario.entity.js';
import { CriarUsuarioDto } from './dto/criar-usuario.dto.js';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(dados: CriarUsuarioDto) {
    const usuarioExiste = await this.usuarioRepository.findOneBy({
      email: dados.email,
    });

    if (usuarioExiste) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = this.usuarioRepository.create({
      ...dados,
      senha: senhaHash,
    });

    const usuarioSalvo = await this.usuarioRepository.save(usuario);

    return {
      id: usuarioSalvo.id,
      nome: usuarioSalvo.nome,
      email: usuarioSalvo.email,
      tipo: usuarioSalvo.tipo,
    };
  }

  async verificarSenha(email: string, senha: string) {
    const usuario = await this.usuarioRepository.findOneBy({ email });

    if (!usuario) {
      return false;
    }

    return bcrypt.compare(senha, usuario.senha);
  }

  async listar() {
    return this.usuarioRepository.find({
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      },
      order: { nome: 'ASC' },
    });
  }

  async buscarPorId(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }

  async atualizar(id: number, dados: AtualizarUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (dados.email) {
      const emailExiste = await this.usuarioRepository.findOneBy({
        email: dados.email,
      });

      if (emailExiste && emailExiste.id !== id) {
        throw new ConflictException('Este e-mail já está cadastrado.');
      }
    }

    if (dados.nome !== undefined) {
      usuario.nome = dados.nome;
    }

    if (dados.email !== undefined) {
      usuario.email = dados.email;
    }

    if (dados.tipo !== undefined) {
      usuario.tipo = dados.tipo;
    }

    if (dados.senha) {
      usuario.senha = await bcrypt.hash(dados.senha, 10);
    }

    const atualizado = await this.usuarioRepository.save(usuario);

    return {
      id: atualizado.id,
      nome: atualizado.nome,
      email: atualizado.email,
      tipo: atualizado.tipo,
    };
  }

  async excluir(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.usuarioRepository.remove(usuario);

    return {
      mensagem: 'Usuário excluído com sucesso.',
    };
  }
}