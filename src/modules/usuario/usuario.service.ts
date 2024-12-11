import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

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

  async findOne(id: number) {
    const usuario = await this.repo.findOne({
      where: { id },
    });
    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
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
