import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { mapUsuario } from 'src/utils/usuario.mapper';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async findAll(id_empresa: number, cod_tipo_usuario: string) {
    const qb = this.repo.createQueryBuilder('usuario');
    qb.leftJoinAndSelect('usuario.tipoUsuario', 'tipoUsuario');
    qb.leftJoinAndSelect('usuario.empresa', 'empresa');

    if (id_empresa) {
      qb.andWhere('empresa.id = :id_empresa', { id_empresa });
    }
    if (cod_tipo_usuario) {
      qb.andWhere('tipoUsuario.codigo = :cod_tipo_usuario', {
        cod_tipo_usuario,
      });
    }

    const usuarios = await qb.getMany();
    return usuarios.map(mapUsuario);
  }

  async count(id_empresa: number) {
    const count = await this.repo.count({
      where: {
        empresa: {
          id: id_empresa,
        },
      },
    });

    return { count };
  }

  async findOne(id: number, idEmpresa?: number) {
    const qb = this.repo.createQueryBuilder('usuario');
    if (idEmpresa) {
      qb.andWhere('usuario.id_empresa = :idEmpresa', { idEmpresa });
    }
    qb.andWhere('usuario.id = :id', { id });
    const usuario = await qb.getOne();

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async findByLogin(user: string, ruc: string) {
    const usuario = await this.repo.findOne({
      relations: ['empresa'],
      where: {
        codusu: user,
        empresa: {
          ruc,
        },
      },
    });
    return usuario;
  }
}
