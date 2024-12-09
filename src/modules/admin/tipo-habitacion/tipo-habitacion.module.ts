import { Module } from '@nestjs/common';
import { TipoHabitacionService } from './tipo-habitacion.service';
import { TipoHabitacionController } from './tipo-habitacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHabitacion } from './entities/tipo-habitacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoHabitacion]),
  ],
  controllers: [TipoHabitacionController],
  providers: [TipoHabitacionService],
})
export class TipoHabitacionModule {}
