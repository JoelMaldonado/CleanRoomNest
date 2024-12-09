import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('StatusHabitacion')
export class StatusHabitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  codigo: string;

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


  @ManyToOne(() => Empresa, (empresa) => empresa.statusHabitaciones)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @OneToMany(
    () => Movimiento,
    (movimiento) => movimiento.statusHabitacion
  )
    movimientos: Movimiento[];
}
