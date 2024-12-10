import { Injectable } from '@nestjs/common';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piso } from './entities/piso.entity';

@Injectable()
export class PisoService {
  constructor(
    @InjectRepository(Piso)
    private readonly repo: Repository<Piso>,
  ) {}
  async create(createPisoDto: CreatePisoDto) {
    return 'This action adds a new piso';
  }

  async findAll() {
    return await this.repo.find({
      relations: ['empresa'],
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, updatePisoDto: UpdatePisoDto) {
    return `This action updates a #${id} piso`;
  }

  async remove(id: number) {
    return `This action removes a #${id} piso`;
  }
}
