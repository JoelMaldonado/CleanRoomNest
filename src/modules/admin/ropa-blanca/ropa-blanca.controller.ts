import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RopaBlancaService } from './ropa-blanca.service';
import { CreateRopaBlancaDto } from './dto/create-ropa-blanca.dto';
import { UpdateRopaBlancaDto } from './dto/update-ropa-blanca.dto';

@Controller('ropa-blanca')
export class RopaBlancaController {
  constructor(private readonly ropaBlancaService: RopaBlancaService) {}

  @Post()
  create(@Body() createRopaBlancaDto: CreateRopaBlancaDto) {
    return this.ropaBlancaService.create(createRopaBlancaDto);
  }

  @Get()
  findAll() {
    return this.ropaBlancaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ropaBlancaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRopaBlancaDto: UpdateRopaBlancaDto) {
    return this.ropaBlancaService.update(+id, updateRopaBlancaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ropaBlancaService.remove(+id);
  }
}
