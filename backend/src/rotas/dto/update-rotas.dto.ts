
import { PartialType } from '@nestjs/mapped-types';
import { CreateRotasDto } from './create-rotas.dto.js';

export class UpdateRotasDto extends PartialType(CreateRotasDto) {}
