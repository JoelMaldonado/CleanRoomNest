import { Module } from '@nestjs/common';
import { RopaBlancaService } from './ropa-blanca.service';
import { RopaBlancaController } from './ropa-blanca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopaBlanca } from './entities/ropa-blanca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopaBlanca])],
  controllers: [RopaBlancaController],
  providers: [RopaBlancaService],
})
export class RopaBlancaModule {}
