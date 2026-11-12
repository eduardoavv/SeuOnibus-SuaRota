
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

import { StatusOnibus } from '../../database/entities/enums.js';

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
  @IsIn(Object.values(StatusOnibus))
  status: StatusOnibus;
}
