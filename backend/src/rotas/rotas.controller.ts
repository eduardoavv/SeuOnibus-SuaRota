import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RotasService } from './rotas.service';
import { CreateRotasDto } from './dto/create-rotas.dto';
import { UpdateRotasDto } from './dto/update-rotas.dto';

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
  findOne(@Param('id') id: string) {
    return this.rotasService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateRotasDto) {
    return this.rotasService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rotasService.remove(Number(id));
  }
}