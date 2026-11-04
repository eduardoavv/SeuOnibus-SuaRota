
import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalizacaoDto } from './create-localizacao.dto.js';

export class UpdateLocalizacaoDto extends PartialType(
  CreateLocalizacaoDto,
) {}
