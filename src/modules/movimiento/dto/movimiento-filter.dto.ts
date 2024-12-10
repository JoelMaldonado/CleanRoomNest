import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class MovimientoFilterDto {
  @IsOptional()
  @IsString()
  fecha?: string; // Para filtrar por fecha (en formato 'YYYY-MM-DD')

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10;
}
