import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TipoHabitacion } from '../../tipo-habitacion/entities/tipo-habitacion.entity';
import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Piso } from '../../piso/entities/piso.entity';

@Entity('Habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  codigo: string;

  @Column({ type: 'varchar', default: '' })
  descripcion: string;

  @Column({ type: 'char', default: 'S' })
  activo: string;

  @Column({ type: 'char', default: 'H' })
  estadoDH: string;

  @Column({ type: 'varchar', default: '' })
  status_api: string;

  @Column({ type: 'varchar', default: '' })
  usuario: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '' })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecmodificacion: Date;

  // Relaciones Many To One
  @ManyToOne(() => Empresa, (empresa) => empresa.habitaciones)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToOne(() => TipoHabitacion, (th) => th.habitaciones)
  @JoinColumn({ name: 'id_tipohab' })
  tipoHabitacion: TipoHabitacion;

  @ManyToOne(() => Piso, (p) => p.habitaciones)
  @JoinColumn({ name: 'id_piso' })
  piso: Piso;

  // Relaciones One To Many //
  @OneToMany(() => Movimiento, (m) => m)
  movimientos: Movimiento[];
}
