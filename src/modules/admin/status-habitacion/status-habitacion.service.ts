import { Injectable } from '@nestjs/common';
import { CreateStatusHabitacionDto } from './dto/create-status-habitacion.dto';
import { UpdateStatusHabitacionDto } from './dto/update-status-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusHabitacion } from './entities/status-habitacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusHabitacionService {
  constructor(
    @InjectRepository(StatusHabitacion)
    private readonly repo: Repository<StatusHabitacion>,
  ) {}
  create(createStatusHabitacionDto: CreateStatusHabitacionDto) {
    return 'This action adds a new statusHabitacion';
  }

  async findAll() {
    return await this.repo.find();
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
