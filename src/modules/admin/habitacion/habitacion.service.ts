import { Injectable } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabitacionService {
  constructor(
    @InjectRepository(Habitacion)
    private readonly repo: Repository<Habitacion>,
  ) {}

  create(createHabitacionDto: CreateHabitacionDto) {
    return 'This action adds a new habitacion';
  }

  async findAll() {
    return await this.repo.find({
      relations: ['tipoHabitacion', 'piso', 'empresa'],
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  update(id: number, updateHabitacionDto: UpdateHabitacionDto) {
    return `This action updates a #${id} habitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitacion`;
  }
}
