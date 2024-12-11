import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';
import { constants } from 'src/config/constants';

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

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOne(+id);
  }
}
