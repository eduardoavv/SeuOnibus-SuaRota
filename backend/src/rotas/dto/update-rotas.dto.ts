import { PartialType } from '@nestjs/mapped-types';
import { CreateRotasDto } from './create-rotas.dto.js';

// ... resto do código continua igual

export class UpdateRotasDto extends PartialType(CreateRotasDto) {}