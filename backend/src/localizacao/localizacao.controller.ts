

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  
  import { LocalizacaoService } from './localizacao.service.js';
  import { CreateLocalizacaoDto } from './dto/create-localizacao.dto.js';
  import { UpdateLocalizacaoDto } from './dto/update-localizacao.dto.js';
  
  @Controller('localizacoes')
  export class LocalizacaoController {
    constructor(
      private readonly localizacaoService: LocalizacaoService,
    ) {}
  
    @Post()
    create(@Body() data: CreateLocalizacaoDto) {
      return this.localizacaoService.create(data);
    }
  
    @Get()
    findAll(
      @Query('page') page?: string,
      @Query('limit') limit?: string,
      @Query('onibusId') onibusId?: string,
    ) {
      return this.localizacaoService.findAll({
        page,
        limit,
        onibusId,
      });
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.localizacaoService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: UpdateLocalizacaoDto,
    ) {
      return this.localizacaoService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.localizacaoService.remove(id);
    }
  }
  