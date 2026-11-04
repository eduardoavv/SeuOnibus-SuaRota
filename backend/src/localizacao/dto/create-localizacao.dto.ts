import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateLocalizacaoDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;
  
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;
  
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    onibusId: number;
  }