import { Injectable } from '@nestjs/common';
import { CreateFrigobarDto } from './dto/create-frigobar.dto';
import { UpdateFrigobarDto } from './dto/update-frigobar.dto';

@Injectable()
export class FrigobarService {
  create(createFrigobarDto: CreateFrigobarDto) {
    return 'This action adds a new frigobar';
  }

  findAll() {
    return `This action returns all frigobar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} frigobar`;
  }

  update(id: number, updateFrigobarDto: UpdateFrigobarDto) {
    return `This action updates a #${id} frigobar`;
  }

  remove(id: number) {
    return `This action removes a #${id} frigobar`;
  }
}
