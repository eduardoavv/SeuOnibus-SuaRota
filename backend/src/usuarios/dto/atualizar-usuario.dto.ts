
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

import { TipoUsuario } from '../../database/entities/enums.js';

export class AtualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ficar vazio.' })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode ficar vazio.' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ficar vazia.' })
  @MinLength(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  })
  senha?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O tipo não pode ficar vazio.' })
  @IsIn(Object.values(TipoUsuario), {
    message: 'Tipo de usuário inválido.',
  })
  tipo?: TipoUsuario;
}
