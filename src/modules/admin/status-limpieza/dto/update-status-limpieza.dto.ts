import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusLimpiezaDto } from './create-status-limpieza.dto';

export class UpdateStatusLimpiezaDto extends PartialType(CreateStatusLimpiezaDto) {}
