import { Module } from '@nestjs/common';
import { StatusHabitacionService } from './status-habitacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusHabitacion } from './entities/status-habitacion.entity';
import { StatusHabitacionController } from './status-habitacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StatusHabitacion])],
  controllers: [StatusHabitacionController],
  providers: [StatusHabitacionService],
})
export class StatusHabitacionModule {}
