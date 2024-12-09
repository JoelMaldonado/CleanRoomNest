import { Module } from '@nestjs/common';
import { AmenitieService } from './amenitie.service';
import { AmenitieController } from './amenitie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenitie } from './entities/amenitie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amenitie])],
  controllers: [AmenitieController],
  providers: [AmenitieService],
})
export class AmenitieModule {}
