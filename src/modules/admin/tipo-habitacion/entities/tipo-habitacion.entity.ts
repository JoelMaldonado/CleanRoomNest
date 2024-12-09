import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Habitacion } from '../../habitacion/entities/habitacion.entity';

@Entity('TipoHabitacion')
export class TipoHabitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', default: '' })
  codigo: string;

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

  // Relación con la entidad Empresa
  // @ManyToOne(() => Empresa, (empresa) => empresa.tipoHabitaciones)
  // @JoinColumn({ name: 'id_empresa' })
  // empresa: Empresa;

  // Relación con la entidad Habitacion
  @OneToMany(() => Habitacion, (habitacion) => habitacion.tipoHabitacion)
  habitaciones: Habitacion[];
}
