import { PartialType } from '@nestjs/mapped-types';
import { CreateFrigobarDto } from './create-frigobar.dto';

export class UpdateFrigobarDto extends PartialType(CreateFrigobarDto) {}
