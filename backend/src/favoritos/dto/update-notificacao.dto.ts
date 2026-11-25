
import { IsBoolean } from 'class-validator';

export class UpdateNotificacaoDto {
  @IsBoolean()
  notificarAtraso: boolean;
}
