import { Injectable } from '@nestjs/common';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';

@Injectable()
export class TipoHabitacionService {
  create(createTipoHabitacionDto: CreateTipoHabitacionDto) {
    return 'This action adds a new tipoHabitacion';
  }

  findAll() {
    return `This action returns all tipoHabitacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoHabitacion`;
  }

  update(id: number, updateTipoHabitacionDto: UpdateTipoHabitacionDto) {
    return `This action updates a #${id} tipoHabitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoHabitacion`;
  }
}
