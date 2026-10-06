import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
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
    findOne(@Param('id') id: string) {
      return this.paradasService.findOne(Number(id));
    }
  
    @Post()
    create(@Body() data: CreateParadaDto) {
      return this.paradasService.create(data);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() data: UpdateParadaDto,
    ) {
      return this.paradasService.update(Number(id), data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.paradasService.remove(Number(id));
    }
  }