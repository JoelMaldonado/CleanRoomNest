import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TipoUsuarioService } from './tipo-usuario.service';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

@Controller('tipo-usuario')
export class TipoUsuarioController {
  constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}

  @Post()
  create(@Body() createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return this.tipoUsuarioService.create(createTipoUsuarioDto);
  }

  @Get()
  findAll(
    @Query('id_empresa') id_empresa: number,
    @Query('codigo') codigo: string,
    @Query('activo') activo: string,
  ) {
    return this.tipoUsuarioService.findAll(id_empresa, codigo, activo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return this.tipoUsuarioService.update(+id, updateTipoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoUsuarioService.remove(+id);
  }
}
