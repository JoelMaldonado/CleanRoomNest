import { Injectable } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Repository } from 'typeorm';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { mapMovimiento } from 'src/utils/map.utils';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
  ) {}
  create(createMovimientoDto: CreateMovimientoDto) {
    return 'This action adds a new movimiento';
  }

  async findAll(filtertDto: MovimientoFilterDto) {
    const query = this.movimientoRepository.createQueryBuilder('movimiento');

    /* Inner Join */
    query.innerJoinAndSelect('movimiento.habitacion', 'habitacion');
    // Habitacion.Empresa
    // query.innerJoinAndSelect('habitacion.empresa', 'empresa');
    query.innerJoinAndSelect('habitacion.tipoHabitacion', 'tipoHabitacion');
    query.innerJoinAndSelect('habitacion.piso', 'piso');

    // Movimiento.StatusHabitacion
    query.innerJoinAndSelect('movimiento.statusHabitacion', 'statusHabitacion');
    query.leftJoinAndSelect('movimiento.usuarioH', 'usuarioH');
    query.leftJoinAndSelect('movimiento.usuarioS', 'usuarioS');
    query.leftJoinAndSelect('movimiento.usuarioC', 'usuarioC');

    if (filtertDto.fecha) {
      query.andWhere('movimiento.fecha = :fecha', { fecha: filtertDto.fecha });
    }

    if (filtertDto.id_empresa) {
      query.andWhere('movimiento.id_empresa = :id_empresa', {
        id_empresa: filtertDto.id_empresa,
      });
    }

    const { page = 1, limit = 10 } = filtertDto;

    const skip = (page - 1) * limit;

    query.skip(skip).take(filtertDto.limit);

    const [items, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      totalPages,
      count: items.length,
      data: items.map(mapMovimiento),
    };
  }

  async findOne(id: number) {
    const movimiento = await this.movimientoRepository.findOne({
      relations: [
        'habitacion',
        'statusHabitacion',
        'usuarioH',
        'usuarioS',
        'usuarioC',
        'habitacion.tipoHabitacion',
        'habitacion.piso',
      ],
      where: { id },
    });
    return mapMovimiento(movimiento);
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}
