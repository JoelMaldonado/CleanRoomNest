import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePisoDto } from './dto/create-piso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piso } from './entities/piso.entity';
import { mapPiso } from 'src/utils/piso.mapper';
import { EmpresaService } from 'src/modules/empresa/empresa.service';
import { FilterPisoDto } from './dto/filter.piso.dto';
import { MovimientoService } from 'src/modules/movimiento/movimiento.service';

@Injectable()
export class PisoService {
  constructor(
    @InjectRepository(Piso)
    private readonly repo: Repository<Piso>,

    private readonly empresaService: EmpresaService,

    private readonly movimientoService: MovimientoService,
  ) {}
  async create(dto: CreatePisoDto) {
    const empresa = await this.empresaService.findOne(dto.idEmpresa);
    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    const piso = new Piso();
    piso.numpiso = dto.numPiso;
    piso.descripcion = dto.descripcion;
    piso.id_empresa = dto.idEmpresa;
    piso.activo = 'S';
    piso.usuario = dto.usuario;

    try {
      await this.repo.save(piso);
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el piso', error);
    }

    return this.findOne(piso.id);
  }

  async findAll(filter: FilterPisoDto) {
    const { idEmpresa } = filter;
    const qb = this.repo.createQueryBuilder('piso');

    // Inner Join
    qb.innerJoinAndSelect('piso.habitaciones', 'habitaciones');

    // Where
    if (idEmpresa) {
      qb.where('piso.id_empresa = :idEmpresa', { idEmpresa });
    }

    const items = await qb.getMany();
    return items.map(mapPiso);
  }

  async findAllMovimientos(filter: FilterPisoDto) {
    const { idEmpresa } = filter;
    const qb = this.repo.createQueryBuilder('piso');

    // Where
    if (idEmpresa) {
      qb.where('piso.id_empresa = :idEmpresa', { idEmpresa });
    }

    const items = await qb.getMany();

    const itemsMap = await Promise.all(
      items.map(async (piso) => {
        const movs = await this.movimientoService.countByIDPiso(piso.id);
        return {
          ...mapPiso(piso),
          totalHabitaciones: movs,
        };
      }),
    );

    return itemsMap;
  }

  async count(id_empresa: number) {
    const qb = this.repo.createQueryBuilder('piso');

    if (id_empresa) {
      qb.where('piso.id_empresa = :id_empresa', { id_empresa });
    }

    const count = await qb.getCount();

    return {
      count,
    };
  }
  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: ['empresa', 'habitaciones'],
      where: { id },
    });
    return mapPiso(item);
  }
}
