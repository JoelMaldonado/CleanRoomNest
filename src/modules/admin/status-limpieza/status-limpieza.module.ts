import { Module } from '@nestjs/common';
import { StatusLimpiezaService } from './status-limpieza.service';
import { StatusLimpiezaController } from './status-limpieza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusLimpieza } from './entities/status-limpieza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusLimpieza])],
  controllers: [StatusLimpiezaController],
  providers: [StatusLimpiezaService],
})
export class StatusLimpiezaModule {}
