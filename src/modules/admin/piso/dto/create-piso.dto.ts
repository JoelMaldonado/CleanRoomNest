import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePisoDto {
  @IsNumber({}, { message: 'El id de la empresa debe ser un número' })
  @IsPositive({ message: 'El id de la empresa debe ser un número positivo' })
  numPiso: number;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  descripcion: string;

  @IsNumber({}, { message: 'El id de la empresa debe ser un número' })
  @IsPositive({ message: 'El id de la empresa debe ser un número positivo' })
  idEmpresa: number;

  @IsString({ message: 'El usuario debe ser un texto' })
  @IsOptional()
  usuario: string;
}
