import { PartialType } from '@nestjs/mapped-types';
import { CreateRopaBlancaDto } from './create-ropa-blanca.dto';

export class UpdateRopaBlancaDto extends PartialType(CreateRopaBlancaDto) {}
