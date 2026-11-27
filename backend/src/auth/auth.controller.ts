import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dados: LoginDto) {
    return this.authService.login(dados.email, dados.senha);
  }
}