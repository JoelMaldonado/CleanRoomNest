import { Inject, Injectable } from '@nestjs/common';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoUsuario } from './entities/tipo-usuario.entity';

@Injectable()
export class TipoUsuarioService {
  constructor(
    @InjectRepository(TipoUsuario)
    private readonly repo: Repository<TipoUsuario>,
  ) {}

  create(createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return 'This action adds a new tipoUsuario';
  }

  async findAll(id_empresa: number, codigo: string, activo: string) {
    const qb = this.repo.createQueryBuilder('tipoUsuario');
    if (id_empresa) {
      qb.where('tipoUsuario.id_empresa = :id_empresa', { id_empresa });
    }
    if (codigo) {
      qb.andWhere('tipoUsuario.codigo = :codigo', { codigo });
    }

    if (activo) {
      qb.andWhere('tipoUsuario.activo = :activo', { activo });
    }
    return await qb.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUsuario`;
  }

  update(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return `This action updates a #${id} tipoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoUsuario`;
  }
}
