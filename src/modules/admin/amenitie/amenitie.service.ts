import { Injectable } from '@nestjs/common';
import { CreateAmenitieDto } from './dto/create-amenitie.dto';
import { UpdateAmenitieDto } from './dto/update-amenitie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Amenitie } from './entities/amenitie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AmenitieService {
  constructor(
    @InjectRepository(Amenitie)
    private readonly repo: Repository<Amenitie>,
  ) {}
  create(createAmenitieDto: CreateAmenitieDto) {
    return 'This action adds a new amenitie';
  }

  async findAll(id_empresa?: string) {
    const qb = this.repo.createQueryBuilder('amenitie')
    .leftJoinAndSelect('amenitie.empresa', 'empresa')

    if (id_empresa) {
      qb.andWhere('empresa.id = :id_empresa', { id_empresa });
    }

    const list = await qb.getMany();

    return list.map((item) => ({
      id: item.id,
      id_empresa: item.empresa.id,
      codigo: item.codigo,
      descripcion: item.descripcion,
      precio: item.precio,
      activo: item.activo,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} amenitie`;
  }

  update(id: number, updateAmenitieDto: UpdateAmenitieDto) {
    return `This action updates a #${id} amenitie`;
  }

  remove(id: number) {
    return `This action removes a #${id} amenitie`;
  }
}
