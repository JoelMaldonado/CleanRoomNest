import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { PisoService } from './piso.service';
import { CreatePisoDto } from './dto/create-piso.dto';
import { FilterPisoDto } from './dto/filter.piso.dto';

@Controller('piso')
export class PisoController {
  constructor(private readonly pisoService: PisoService) {}

  @Post()
  create(@Body() dto: CreatePisoDto) {
    return this.pisoService.create(dto);
  }

  @Get()
  findAll(@Query() filter: FilterPisoDto) {
    return this.pisoService.findAll(filter);
  }

  @Get('movimientos')
  findAllMovimientos(@Query() filter: FilterPisoDto) {
    return this.pisoService.findAllMovimientos(filter);
  }

  @Get('count')
  count(@Query('id_empresa') id_empresa: number) {
    return this.pisoService.count(id_empresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pisoService.findOne(+id);
  }
}
