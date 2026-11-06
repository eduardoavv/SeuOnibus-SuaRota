
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CriarUsuarioDto } from './dto/criar-usuario.dto.js';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criar(dados: CriarUsuarioDto) {
    const usuarioExiste = await this.prisma.usuario.findUnique({
      where: { email: dados.email },
    });

    if (usuarioExiste) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }
    const senhaHash = await bcrypt.hash(dados.senha, 10);
    return this.prisma.usuario.create({
     data: {
      ...dados,
      senha: senhaHash,
    },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      },
    });
  }
  async verificarSenha(email: string, senha: string) {
  const usuario = await this.prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    return false;
  }

  return bcrypt.compare(senha, usuario.senha);
}

  async listar() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
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
  await this.buscarPorId(id);

  if (dados.email) {
    const emailExiste = await this.prisma.usuario.findUnique({
      where: { email: dados.email },
    });

    if (emailExiste && emailExiste.id !== id) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }
  }

  const dadosAtualizados = { ...dados };

  if (dadosAtualizados.senha) {
    dadosAtualizados.senha = await bcrypt.hash(
      dadosAtualizados.senha,
      10,
    );
  }

  return this.prisma.usuario.update({
    where: { id },
    data: dadosAtualizados,
    select: {
      id: true,
      nome: true,
      email: true,
      tipo: true,
    },
  });
}

  async excluir(id: number) {
    await this.buscarPorId(id);

    await this.prisma.usuario.delete({
      where: { id },
    });

    return {
      mensagem: 'Usuário excluído com sucesso.',
    };
  }
}
