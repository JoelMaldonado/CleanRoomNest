import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AmenitieService } from './amenitie.service';
import { CreateAmenitieDto } from './dto/create-amenitie.dto';
import { UpdateAmenitieDto } from './dto/update-amenitie.dto';

@Controller('amenitie')
export class AmenitieController {
  constructor(private readonly amenitieService: AmenitieService) {}

  @Post()
  create(@Body() createAmenitieDto: CreateAmenitieDto) {
    return this.amenitieService.create(createAmenitieDto);
  }

  @Get()
  findAll(@Query('id_empresa') id_empresa?: string) {
    return this.amenitieService.findAll(id_empresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenitieService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAmenitieDto: UpdateAmenitieDto,
  ) {
    return this.amenitieService.update(+id, updateAmenitieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenitieService.remove(+id);
  }
}
