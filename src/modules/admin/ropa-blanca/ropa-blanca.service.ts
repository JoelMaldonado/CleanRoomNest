import { Injectable } from '@nestjs/common';
import { CreateRopaBlancaDto } from './dto/create-ropa-blanca.dto';
import { UpdateRopaBlancaDto } from './dto/update-ropa-blanca.dto';

@Injectable()
export class RopaBlancaService {
  create(createRopaBlancaDto: CreateRopaBlancaDto) {
    return 'This action adds a new ropaBlanca';
  }

  findAll() {
    return `This action returns all ropaBlanca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ropaBlanca`;
  }

  update(id: number, updateRopaBlancaDto: UpdateRopaBlancaDto) {
    return `This action updates a #${id} ropaBlanca`;
  }

  remove(id: number) {
    return `This action removes a #${id} ropaBlanca`;
  }
}
