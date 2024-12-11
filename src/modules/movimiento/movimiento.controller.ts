import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';
import { constants } from 'src/config/constants';
import { log } from 'console';

@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientoService.create(createMovimientoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() filtertDto: MovimientoFilterDto, @Req() req: Request) {
    const user = req[constants.user];
    return this.movimientoService.findAll(filtertDto, user.id_empresa);
  }

  @Get('simple')
  findAllSimple(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('id_empresa') id_empresa: number,
    @Query('fecha') fecha: string,
    @Query('cod_tipo_usuario') cod_tipo_usuario: string,
    @Query('id_usuario') id_usuario: number,
  ) {
    return this.movimientoService.findAllSimple(page, limit, id_empresa, fecha, cod_tipo_usuario, id_usuario);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimientoDto: UpdateMovimientoDto,
  ) {
    return this.movimientoService.update(+id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoService.remove(+id);
  }
}
