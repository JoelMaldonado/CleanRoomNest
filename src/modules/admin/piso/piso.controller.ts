import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PisoService } from './piso.service';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';

@Controller('piso')
export class PisoController {
  constructor(private readonly pisoService: PisoService) {}

  @Post()
  create(@Body() dto: CreatePisoDto) {
    return this.pisoService.create(dto);
  }

  @Get()
  findAll(
    @Query('id_empresa') id_empresa: string,
  ) {
    return this.pisoService.findAll(id_empresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pisoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePisoDto: UpdatePisoDto) {
    return this.pisoService.update(+id, updatePisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pisoService.remove(+id);
  }
}
