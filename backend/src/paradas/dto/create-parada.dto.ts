
import { IsNumber, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateParadaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
