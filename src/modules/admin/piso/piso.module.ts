import { Module } from '@nestjs/common';
import { PisoService } from './piso.service';
import { PisoController } from './piso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Piso])],
  controllers: [PisoController],
  providers: [PisoService],
})
export class PisoModule {}
