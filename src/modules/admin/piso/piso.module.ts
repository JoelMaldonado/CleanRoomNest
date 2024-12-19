import { Module } from '@nestjs/common';
import { PisoService } from './piso.service';
import { PisoController } from './piso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';
import { EmpresaModule } from 'src/modules/empresa/empresa.module';
import { MovimientoModule } from 'src/modules/movimiento/movimiento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Piso]), EmpresaModule, MovimientoModule],
  controllers: [PisoController],
  providers: [PisoService],
})
export class PisoModule {}
