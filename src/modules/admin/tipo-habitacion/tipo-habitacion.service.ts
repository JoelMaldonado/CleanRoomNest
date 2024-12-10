import { Injectable } from '@nestjs/common';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoHabitacion } from './entities/tipo-habitacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoHabitacionService {
  constructor(
    @InjectRepository(TipoHabitacion)
    private readonly repo: Repository<TipoHabitacion>,
  ) {}

  create(createTipoHabitacionDto: CreateTipoHabitacionDto) {
    return 'This action adds a new tipoHabitacion';
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  update(id: number, updateTipoHabitacionDto: UpdateTipoHabitacionDto) {
    return `This action updates a #${id} tipoHabitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoHabitacion`;
  }
}
