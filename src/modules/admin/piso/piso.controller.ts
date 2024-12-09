import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PisoService } from './piso.service';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';

@Controller('piso')
export class PisoController {
  constructor(private readonly pisoService: PisoService) {}

  @Post()
  create(@Body() createPisoDto: CreatePisoDto) {
    return this.pisoService.create(createPisoDto);
  }

  @Get()
  findAll() {
    return this.pisoService.findAll();
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
