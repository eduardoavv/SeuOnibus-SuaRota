
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';

import { TipoUsuario } from '../../database/entities/enums.js';

export class CriarUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  })
  senha: string;

  @IsString()
  @IsNotEmpty({ message: 'O tipo de usuário é obrigatório.' })
  @IsIn(Object.values(TipoUsuario), {
    message: 'Tipo de usuário inválido.',
  })
  tipo: TipoUsuario;
}
