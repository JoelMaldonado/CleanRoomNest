import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusLimpiezaService } from './status-limpieza.service';
import { CreateStatusLimpiezaDto } from './dto/create-status-limpieza.dto';
import { UpdateStatusLimpiezaDto } from './dto/update-status-limpieza.dto';

@Controller('status-limpieza')
export class StatusLimpiezaController {
  constructor(private readonly statusLimpiezaService: StatusLimpiezaService) {}

  @Post()
  create(@Body() createStatusLimpiezaDto: CreateStatusLimpiezaDto) {
    return this.statusLimpiezaService.create(createStatusLimpiezaDto);
  }

  @Get()
  findAll() {
    return this.statusLimpiezaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusLimpiezaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusLimpiezaDto: UpdateStatusLimpiezaDto) {
    return this.statusLimpiezaService.update(+id, updateStatusLimpiezaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusLimpiezaService.remove(+id);
  }
}
