import { Injectable } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Between, Repository } from 'typeorm';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { mapMovimiento, mapMovimientoSimple } from 'src/utils/map.utils';
import { MovAmenities } from './entities/mov-amenitie.entity';
import { MovFrigobar } from './entities/mov-frigobar.entity';
import { MovRopaBlanca } from './entities/mov-ropablanca.entity';
import { format } from 'date-fns';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly repo: Repository<Movimiento>,

    @InjectRepository(MovAmenities)
    private readonly repoMovAmenities: Repository<MovAmenities>,

    @InjectRepository(MovRopaBlanca)
    private readonly repoMovRopaBlanca: Repository<MovRopaBlanca>,

    @InjectRepository(MovFrigobar)
    private readonly repoMovFrigobar: Repository<MovFrigobar>,
  ) {}

  create(createMovimientoDto: CreateMovimientoDto) {
    return 'This action adds a new movimiento';
  }

  async findAll(filtertDto: MovimientoFilterDto, id_empresa: number) {
    const query = this.repo.createQueryBuilder('movimiento');

    /* Inner Join */
    // Habitacion
    query.innerJoinAndSelect('movimiento.habitacion', 'habitacion');
    query.innerJoinAndSelect('habitacion.tipoHabitacion', 'tipoHabitacion');
    query.innerJoinAndSelect('habitacion.piso', 'piso');

    // Empresa
    query.innerJoinAndSelect('movimiento.empresa', 'empresa');

    // Estados del Movimiento
    query.innerJoinAndSelect('movimiento.statusHabitacion', 'statusHabitacion');
    query.innerJoinAndSelect('movimiento.statusLimpH', 'statusLimpH');
    query.innerJoinAndSelect('movimiento.statusLimpC', 'statusLimpC');
    query.innerJoinAndSelect('movimiento.statusLimpS', 'statusLimpS');

    // Usuarios
    query.leftJoinAndSelect('movimiento.usuarioH', 'usuarioH');
    query.leftJoinAndSelect('movimiento.usuarioS', 'usuarioS');
    query.leftJoinAndSelect('movimiento.usuarioC', 'usuarioC');

    // Movimiento Amenities
    query.leftJoinAndSelect('movimiento.ropaBlanca', 'ropaBlanca');

    if (filtertDto.fecha) {
      query.andWhere('movimiento.fecha = :fecha', { fecha: filtertDto.fecha });
    }

    query.andWhere('movimiento.id_empresa = :id_empresa', { id_empresa });

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

  async findAllSimple(
    page: number,
    limit: number,
    id_empresa: number,
    fecha: string,
    id_usuario_hk: number,
    id_usuario_c: number,
    id_usuario_s: number,
  ) {
    const qb = this.repo.createQueryBuilder('movimiento');

    // Inner Join
    qb.innerJoinAndSelect('movimiento.habitacion', 'habitacion');
    qb.innerJoinAndSelect('movimiento.statusHabitacion', 'statusHabitacion');
    qb.innerJoinAndSelect('movimiento.empresa', 'empresa');
    qb.leftJoinAndSelect('movimiento.usuarioH', 'usuarioH');
    qb.leftJoinAndSelect('movimiento.usuarioS', 'usuarioS');
    qb.leftJoinAndSelect('movimiento.usuarioC', 'usuarioC');
    qb.innerJoinAndSelect('habitacion.tipoHabitacion', 'tipoHabitacion');
    qb.innerJoinAndSelect('habitacion.piso', 'piso');

    // Where
    if (id_empresa) {
      qb.andWhere('movimiento.empresa = :id_empresa', { id_empresa });
    }
    if (fecha) {
      qb.andWhere('movimiento.fecha = :fecha', { fecha });
    }

    if (id_usuario_hk) {
      qb.andWhere('movimiento.usuarioH = :id_usuario_hk', { id_usuario_hk });
    }

    if (id_usuario_c) {
      qb.andWhere('movimiento.usuarioC = :id_usuario_c', { id_usuario_c });
    }

    if (id_usuario_s) {
      qb.andWhere('movimiento.usuarioS = :id_usuario_s', { id_usuario_s });
    }

    // Paginacion
    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [movimientos, count] = await qb.getManyAndCount();

    return {
      totalPages: Math.ceil(count / limit),
      count: movimientos.length,
      data: movimientos.map(mapMovimientoSimple),
    };
  }

  async findOne(id: number) {
    const movimiento = await this.repo.findOne({
      relations: [
        'habitacion',
        'statusHabitacion',
        'usuarioH',
        'usuarioS',
        'usuarioC',
        'habitacion.tipoHabitacion',
        'habitacion.piso',
        'amenities',
        'amenities.amenitie',
        'ropaBlanca',
        'ropaBlanca.ropaBlanca',
        'frigobar',
        'frigobar.frigobar',
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
