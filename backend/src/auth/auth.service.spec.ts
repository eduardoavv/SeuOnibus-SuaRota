
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const senhaValida = await this.usuariosService.verificarSenha(
      email,
      senha,
    );

    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const usuarios = await this.usuariosService.listar();

    const usuario = usuarios.find((item) => item.email === email);

    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      tipo: usuario.tipo,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario,
    };
  }
}
