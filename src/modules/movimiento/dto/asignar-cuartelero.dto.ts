import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class AsignarCuarteleroDto {

  @ApiProperty({ description: 'ID del Movimiento', example: 16273 })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({ description: 'ID del HouseKeeping', example: 78 })
  @IsNumber()
  @IsPositive()
  idHK: number;

  @ApiProperty({ description: 'ID del Cuartelero', example: 76 })
  @IsNumber()
  @IsPositive()
  idC: number;

  @ApiProperty({ description: 'Fecha de asignación', example: '2024-12-13T15:30:00Z' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty({ description: 'ID de la Empresa', example: 1 })
  @IsNumber()
  @IsPositive()
  idEmpresa: number;
}
