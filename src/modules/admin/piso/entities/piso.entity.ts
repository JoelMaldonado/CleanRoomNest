import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Habitacion } from '../../habitacion/entities/habitacion.entity';

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

  @Column({ type: 'int' })
  id_empresa: number;

  @Column({ type: 'varchar', default: '' })
  usuario: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '' })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecmodificacion: Date;

  // Relacion Many To One

  // Relacion One To Many
  @OneToMany(() => Habitacion, (habitacion) => habitacion.piso)
  habitaciones: Habitacion[];
}
