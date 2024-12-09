import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Amenities')
export class Amenitie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10,
    default: '',
  })
  codigo: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '',
  })
  descripcion: string;

  @Column({
    type: 'decimal',
    default: 0,
    precision: 18,
    scale: 2,
  })
  precio: number;

  @Column({
    type: 'char',
    length: 1,
    default: 'S',
  })
  activo: string;

  @ManyToOne(() => Empresa, (e) => e.amenities)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
  })
  usuario: string;

  @Column({
    type: 'datetime',
    default: '',
  })
  fecregistro: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
  })
  usuariomodifica: string;

  @Column({
    type: 'datetime',
    default: '',
  })
  fecmodificacion: Date;
}
