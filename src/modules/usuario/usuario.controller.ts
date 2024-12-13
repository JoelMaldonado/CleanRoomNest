import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(
    @Query('id_empresa') id_empresa: number,
    @Query('cod_tipo_usuario') cod_tipo_usuario: string,
  ) {
    return this.usuarioService.findAll(id_empresa, cod_tipo_usuario);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('id_empresa') id_empresa: number,
  ) {
    return this.usuarioService.findOne(+id, id_empresa);
  }
}
