import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async findAll(id_empresa: number, cod_tipo_usuario: string) {
    const qb = this.repo.createQueryBuilder('usuario');
    qb.leftJoinAndSelect('usuario.tipoUsuario', 'tipoUsuario');

    if (id_empresa) {
      qb.where('usuario.id_empresa = :id_empresa', { id_empresa });
    }
    if (cod_tipo_usuario) {
      qb.andWhere('tipoUsuario.codigo = :cod_tipo_usuario', {
        cod_tipo_usuario,
      });
    }

    const usuarios = await qb.getMany();
    return usuarios;
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
