import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { OnibusService } from './onibus.service.js';
import { CreateOnibusDto } from './dto/create-onibus.dto.js';
import { UpdateOnibusDto } from './dto/update-onibus.dto.js';

@Controller('onibus')
export class OnibusController {
  constructor(private readonly onibusService: OnibusService) {}

  @Post()
  create(@Body() createOnibusDto: CreateOnibusDto) {
    return this.onibusService.create(createOnibusDto);
  }

  @Get()
  findAll() {
    return this.onibusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.onibusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOnibusDto: UpdateOnibusDto,
  ) {
    return this.onibusService.update(id, updateOnibusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.onibusService.remove(id);
  }
}