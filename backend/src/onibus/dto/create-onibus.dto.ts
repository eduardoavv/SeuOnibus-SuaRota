import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateOnibusDto {
  @IsNotEmpty()
  @IsString()
  placa: string;

  @IsNotEmpty()
  @IsString()
  identificacaoRFID: string;

  @IsNotEmpty()
  @IsString()
  modelo: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['ATIVO', 'INATIVO'])
  status: string;
}
