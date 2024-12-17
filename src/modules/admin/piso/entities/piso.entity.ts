import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Habitacion } from '../../habitacion/entities/habitacion.entity';
import { Empresa } from 'src/modules/empresa/entities/empresa.entity';

@Entity('Pisos')
export class Piso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', default: 0 })
  numpiso: number;

  @Column({ type: 'varchar', default: '' })
  descripcion: string;

  @Column({ type: 'char', default: 'S' })
  activo: string;


  @Column({ type: 'varchar', default: '' })
  usuario: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '' })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecmodificacion: Date;

  // Relacion Many To One

  @Column({
    type: 'int'
  })
  id_empresa: number;

  // Relacion One To Many
  @OneToMany(() => Habitacion, (habitacion) => habitacion.piso)
  habitaciones: Habitacion[];
}
