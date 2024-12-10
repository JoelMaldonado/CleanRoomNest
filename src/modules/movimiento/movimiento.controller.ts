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
} from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';
import { constants } from 'src/config/constants';

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
