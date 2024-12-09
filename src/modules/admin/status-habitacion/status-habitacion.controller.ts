import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusHabitacionService } from './status-habitacion.service';
import { CreateStatusHabitacionDto } from './dto/create-status-habitacion.dto';
import { UpdateStatusHabitacionDto } from './dto/update-status-habitacion.dto';

@Controller('status-habitacion')
export class StatusHabitacionController {
  constructor(private readonly statusHabitacionService: StatusHabitacionService) {}

  @Post()
  create(@Body() createStatusHabitacionDto: CreateStatusHabitacionDto) {
    return this.statusHabitacionService.create(createStatusHabitacionDto);
  }

  @Get()
  findAll() {
    return this.statusHabitacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusHabitacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusHabitacionDto: UpdateStatusHabitacionDto) {
    return this.statusHabitacionService.update(+id, updateStatusHabitacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusHabitacionService.remove(+id);
  }
}
