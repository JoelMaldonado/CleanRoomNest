import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piso } from './entities/piso.entity';
import { mapPiso } from 'src/utils/piso.mapper';
import { EmpresaService } from 'src/modules/empresa/empresa.service';

@Injectable()
export class PisoService {
  constructor(
    @InjectRepository(Piso)
    private readonly repo: Repository<Piso>,

    private readonly empresaService: EmpresaService,
  ) {}
  async create(dto: CreatePisoDto) {
    const empresa = await this.empresaService.findOne(dto.idEmpresa);
    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    const piso = new Piso();
    piso.numpiso = dto.numPiso;
    piso.descripcion = dto.descripcion;
    piso.empresa = empresa;
    piso.activo = 'S';
    piso.usuario = dto.usuario;

    try {
      await this.repo.save(piso);
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el piso', error);
    }

    return this.findOne(piso.id);
  }

  async findAll(id_empresa: string) {
    const qb = this.repo.createQueryBuilder('piso');

    // Inner Join
    qb.innerJoinAndSelect('piso.empresa', 'empresa');
    qb.innerJoinAndSelect('piso.habitaciones', 'habitaciones');

    // Where
    if (id_empresa) {
      qb.where('piso.id_empresa = :id_empresa', { id_empresa });
    }
    const items = await qb.getMany();
    return items.map(mapPiso);
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({
      relations: ['empresa', 'habitaciones'],
      where: { id },
    });
    return mapPiso(item);
  }

  async update(id: number, updatePisoDto: UpdatePisoDto) {
    return `This action updates a #${id} piso`;
  }

  async remove(id: number) {
    return `This action removes a #${id} piso`;
  }
}
