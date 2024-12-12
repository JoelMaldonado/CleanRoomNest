import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Repository } from 'typeorm';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { mapMovimiento, mapMovimientoSimple } from 'src/utils/map.utils';
import { MovAmenities } from './entities/mov-amenitie.entity';
import { MovFrigobar } from './entities/mov-frigobar.entity';
import { MovRopaBlanca } from './entities/mov-ropablanca.entity';
import { log } from 'console';

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

  async findAll(dto: MovimientoFilterDto) {
    const { page = 1, limit = 10, fecha, id_empresa } = dto;

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

    if (fecha) {
      query.andWhere('movimiento.fecha = :fecha', { fecha: fecha });
    }

    query.andWhere('movimiento.id_empresa = :id_empresa', { id_empresa });

    const skip = (page - 1) * limit;

    query.skip(skip).take(limit);

    const [items, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      totalPages,
      count: items.length,
      data: items.map(mapMovimiento),
    };
  }

  async findAllSimple(dto: MovimientoFilterDto) {
    const {
      page = 1,
      limit = 10,
      id_empresa,
      fecha,
      cod_tipo_usuario,
      cod_status_limpieza,
      id_usuario,
      id_piso,
    } = dto;

    const qb = this.repo.createQueryBuilder('movimiento');

    // Inner Join
    qb.leftJoinAndSelect('movimiento.empresa', 'empresa');
    qb.leftJoinAndSelect('movimiento.habitacion', 'habitacion');
    qb.leftJoinAndSelect('habitacion.piso', 'piso');
    qb.leftJoinAndSelect('movimiento.statusHabitacion', 'statusHabitacion');
    qb.leftJoinAndSelect('habitacion.tipoHabitacion', 'tipoHabitacion');
    qb.leftJoinAndSelect('movimiento.usuarioH', 'usuarioH');
    qb.leftJoinAndSelect('movimiento.usuarioS', 'usuarioS');
    qb.leftJoinAndSelect('movimiento.usuarioC', 'usuarioC');
    qb.leftJoinAndSelect('movimiento.statusLimpH', 'statusLimpH');
    qb.leftJoinAndSelect('movimiento.statusLimpC', 'statusLimpC');
    qb.leftJoinAndSelect('movimiento.statusLimpS', 'statusLimpS');

    // Where
    if (id_empresa) {
      qb.where('empresa.id = :id_empresa', { id_empresa });
    }

    if (fecha) {
      qb.andWhere('movimiento.fecha = :fecha', { fecha });
    }

    if (id_piso) {
      qb.andWhere('piso.id = :id_piso', { id_piso });
    }

    
    switch (cod_tipo_usuario) {
      case 'H':
        if (id_usuario) {
          qb.andWhere('movimiento.usuarioH = :id_usuario', { id_usuario });
        }
        if (cod_status_limpieza) {
          qb.andWhere('statusLimpH.codigo = :cod_status_limpieza', {
            cod_status_limpieza,
          });
        }
        break;
      case 'S':
        if (id_usuario) {
          qb.andWhere('movimiento.usuarioS = :id_usuario', { id_usuario });
        }
        if (cod_status_limpieza) {
          qb.andWhere('statusLimpS.codigo = :cod_status_limpieza', {
            cod_status_limpieza,
          });
        }
        break;
      case 'C':
        if (id_usuario) {
          qb.andWhere('movimiento.usuarioC = :id_usuario', { id_usuario });
        }
        if (cod_status_limpieza) {
          qb.andWhere('statusLimpC.codigo = :cod_status_limpieza', {
            cod_status_limpieza,
          });
        }
        break;
    }

    // ordenar descendentemente
    qb.orderBy('habitacion.codigo', 'ASC');

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
        'statusLimpH',
        'statusLimpS',
        'statusLimpC',
        'empresa',
      ],
      where: { id },
    });
    return mapMovimientoSimple(movimiento);
  }
}
