
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ParadasService } from './paradas.service.js';
import { CreateParadaDto } from './dto/create-parada.dto.js';
import { UpdateParadaDto } from './dto/update-parada.dto.js';

@Controller('paradas')
export class ParadasController {
  constructor(private readonly paradasService: ParadasService) {}

  @Get()
  findAll() {
    return this.paradasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paradasService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateParadaDto) {
    return this.paradasService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateParadaDto,
  ) {
    return this.paradasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paradasService.remove(id);
  }
}
