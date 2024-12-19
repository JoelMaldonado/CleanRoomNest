import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { MovAmenities } from './entities/mov-amenitie.entity';
import { MovRopaBlanca } from './entities/mov-ropablanca.entity';
import { MovFrigobar } from './entities/mov-frigobar.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movimiento,
      MovAmenities,
      MovRopaBlanca,
      MovFrigobar,
    ]),
    UsuarioModule,
  ],
  exports: [MovimientoService],
  controllers: [MovimientoController],
  providers: [MovimientoService],
})
export class MovimientoModule {}
