import { Injectable } from '@nestjs/common';
import { CreateStatusLimpiezaDto } from './dto/create-status-limpieza.dto';
import { UpdateStatusLimpiezaDto } from './dto/update-status-limpieza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusLimpieza } from './entities/status-limpieza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusLimpiezaService {
  constructor(
    @InjectRepository(StatusLimpieza)
    private readonly repo: Repository<StatusLimpieza>,
  ) {}

  create(createStatusLimpiezaDto: CreateStatusLimpiezaDto) {
    return 'This action adds a new statusLimpieza';
  }

  async findAll() {
    return await this.repo.find();
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
