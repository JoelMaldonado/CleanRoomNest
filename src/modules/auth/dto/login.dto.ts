import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'El usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  user: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  pass: string;

  @IsString({ message: 'ruc debe ser un texto' })
  @IsNotEmpty({ message: 'ruc es requerido' })
  ruc: string;
}
