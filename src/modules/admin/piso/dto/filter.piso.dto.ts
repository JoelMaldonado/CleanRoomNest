import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterPisoDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El id de la empresa debe ser un número' })
  idEmpresa?: number;
}
