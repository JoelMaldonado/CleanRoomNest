import { Injectable } from '@nestjs/common';
import { CreateStatusLimpiezaDto } from './dto/create-status-limpieza.dto';
import { UpdateStatusLimpiezaDto } from './dto/update-status-limpieza.dto';

@Injectable()
export class StatusLimpiezaService {
  create(createStatusLimpiezaDto: CreateStatusLimpiezaDto) {
    return 'This action adds a new statusLimpieza';
  }

  findAll() {
    return `This action returns all statusLimpieza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusLimpieza`;
  }

  update(id: number, updateStatusLimpiezaDto: UpdateStatusLimpiezaDto) {
    return `This action updates a #${id} statusLimpieza`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusLimpieza`;
  }
}
