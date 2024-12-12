import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class MovimientoFilterDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_empresa: number;

  @IsOptional()
  @IsString()
  fecha: string;

  @IsOptional()
  @IsString()
  cod_tipo_usuario: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_usuario: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_piso: number;

  
}
