import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';

@Controller('habitacion')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  @Post()
  create(@Body() createHabitacionDto: CreateHabitacionDto) {
    return this.habitacionService.create(createHabitacionDto);
  }

  @Get()
  findAll() {
    return this.habitacionService.findAll();
  }

  @Get('count')
  count(
    @Query('id_empresa') id_empresa: number,
  ) {
    return this.habitacionService.count(id_empresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitacionDto: UpdateHabitacionDto) {
    return this.habitacionService.update(+id, updateHabitacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitacionService.remove(+id);
  }
}
