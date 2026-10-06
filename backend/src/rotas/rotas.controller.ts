import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RotasService } from './rotas.service.js';
import { CreateRotasDto } from './dto/create-rotas.dto.js';
import { UpdateRotasDto } from './dto/update-rotas.dto.js';

// ... resto do código continua igual
@Controller('rotas')
export class RotasController {
  constructor(private readonly rotasService: RotasService) {}

  @Post()
  create(@Body() body: CreateRotasDto) {
    return this.rotasService.create(body);
  }

  @Get()
  findAll() {
    return this.rotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rotasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRotasDto) {
    return this.rotasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rotasService.remove(id);
  }
}