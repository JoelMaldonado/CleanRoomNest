import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoHabitacionService } from './tipo-habitacion.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';

@Controller('tipo-habitacion')
export class TipoHabitacionController {
  constructor(private readonly tipoHabitacionService: TipoHabitacionService) {}

  @Post()
  create(@Body() createTipoHabitacionDto: CreateTipoHabitacionDto) {
    return this.tipoHabitacionService.create(createTipoHabitacionDto);
  }

  @Get()
  findAll() {
    return this.tipoHabitacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoHabitacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoHabitacionDto: UpdateTipoHabitacionDto) {
    return this.tipoHabitacionService.update(+id, updateTipoHabitacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoHabitacionService.remove(+id);
  }
}
