import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Repository } from 'typeorm';
import { MovimientoFilterDto } from './dto/movimiento-filter.dto';
import { mapMovimiento, mapMovimientoSimple } from 'src/utils/map.utils';
import { AsignarCuarteleroDto } from './dto/asignar-cuartelero.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { format } from 'date-fns';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly repo: Repository<Movimiento>,

    private readonly usuarioService: UsuarioService,
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
        /*
        if (id_usuario) {
          qb.andWhere('movimiento.usuarioS = :id_usuario', { id_usuario });
        }
        if (cod_status_limpieza) {
          qb.andWhere('statusLimpS.codigo = :cod_status_limpieza', {
            cod_status_limpieza,
          });
        }
        */
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

  async countByIDPiso(id_piso: number) {
    const qb = this.repo.createQueryBuilder('movimiento');

    qb.leftJoin('movimiento.habitacion', 'habitacion');
    qb.leftJoin('habitacion.piso', 'piso');

    qb.where('piso.id = :id_piso', { id_piso });

    const formattedDate = format(new Date(), 'yyyy-MM-dd');

    qb.andWhere('movimiento.fecha = :fecha', { fecha: formattedDate });

    const count = await qb.getCount();
    return count;
  }

  async findOneSimple(id: number) {
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
    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }
    return movimiento;
  }

  async asignarCuartelero(dto: AsignarCuarteleroDto) {
    const { id, idC, idEmpresa } = dto;
    const movimiento = await this.findOne(id);

    if (idC === 0) {
      movimiento.usuarioC = null;
    } else {
      const cuartelero = await this.usuarioService.findOne(idC, idEmpresa);
      movimiento.usuarioC = cuartelero;
    }

    await this.repo.save(movimiento);

    return this.findOneSimple(movimiento.id);
  }
}
