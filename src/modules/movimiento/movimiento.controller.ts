import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';
import { constants } from 'src/config/constants';
import { AsignarCuarteleroDto } from './dto/asignar-cuartelero.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movimiento')
@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() filtertDto: MovimientoFilterDto, @Req() req: Request) {
    const user = req[constants.user];
    return this.movimientoService.findAll({
      ...filtertDto,
      id_empresa: user.id_empresa,
    });
  }

  @Get('simple')
  findAllSimple(@Query() dto: MovimientoFilterDto) {
    return this.movimientoService.findAllSimple(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOneSimple(+id);
  }

  @Post('asignar-cuartelero')
  asignarCuartelero(@Body() dto: AsignarCuarteleroDto) {
    return this.movimientoService.asignarCuartelero(dto);
  }
}
