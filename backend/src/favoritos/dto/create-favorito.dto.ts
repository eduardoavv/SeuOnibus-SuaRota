
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateFavoritoDto {
  @IsInt()
  @Min(1)
  usuarioId: number;

  @IsInt()
  @Min(1)
  rotaId: number;

  @IsOptional()
  @IsBoolean()
  notificarAtraso?: boolean;
}
