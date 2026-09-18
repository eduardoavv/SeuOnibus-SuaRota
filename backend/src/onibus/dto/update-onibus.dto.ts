import { PartialType } from '@nestjs/mapped-types';
import { CreateOnibusDto } from './create-onibus.dto.js';

export class UpdateOnibusDto extends PartialType(CreateOnibusDto) {}