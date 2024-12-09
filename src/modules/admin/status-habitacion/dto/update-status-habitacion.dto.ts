import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusHabitacionDto } from './create-status-habitacion.dto';

export class UpdateStatusHabitacionDto extends PartialType(CreateStatusHabitacionDto) {}
