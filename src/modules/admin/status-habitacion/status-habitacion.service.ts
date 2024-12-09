import { Injectable } from '@nestjs/common';
import { CreateStatusHabitacionDto } from './dto/create-status-habitacion.dto';
import { UpdateStatusHabitacionDto } from './dto/update-status-habitacion.dto';

@Injectable()
export class StatusHabitacionService {
  create(createStatusHabitacionDto: CreateStatusHabitacionDto) {
    return 'This action adds a new statusHabitacion';
  }

  findAll() {
    return `This action returns all statusHabitacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusHabitacion`;
  }

  update(id: number, updateStatusHabitacionDto: UpdateStatusHabitacionDto) {
    return `This action updates a #${id} statusHabitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusHabitacion`;
  }
}
