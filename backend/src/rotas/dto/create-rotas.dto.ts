import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRotasDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}