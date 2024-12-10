import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrigobarService } from './frigobar.service';
import { CreateFrigobarDto } from './dto/create-frigobar.dto';
import { UpdateFrigobarDto } from './dto/update-frigobar.dto';

@Controller('frigobar')
export class FrigobarController {
  constructor(private readonly frigobarService: FrigobarService) {}

  @Post()
  create(@Body() createFrigobarDto: CreateFrigobarDto) {
    return this.frigobarService.create(createFrigobarDto);
  }

  @Get()
  findAll() {
    return this.frigobarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frigobarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrigobarDto: UpdateFrigobarDto) {
    return this.frigobarService.update(+id, updateFrigobarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frigobarService.remove(+id);
  }
}
