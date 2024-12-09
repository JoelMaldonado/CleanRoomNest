import { Habitacion } from 'src/modules/admin/habitacion/entities/habitacion.entity';
import { StatusHabitacion } from 'src/modules/admin/status-habitacion/entities/status-habitacion.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Movimiento' })
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true, default: null })
  fecha: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraH: Date;


  @Column({ nullable: true })
  id_statusLimpH: number;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraiC: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahorafC: Date;

  @Column({ nullable: true })
  id_statusLimpC: number;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraiS: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraS: Date;

  @Column({ nullable: true })
  id_statusLimpS: number;

  @Column({ type: 'varchar', nullable: true, default: '' })
  observaciones: string;

  @Column()
  id_empresa: number;

  @Column({ type: 'varchar', nullable: true, default: '' })
  fotobanio: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  fotohabitacion: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  fotoextra: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  usuario: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecregistro: Date;

  @Column({ type: 'varchar', nullable: true, default: '' })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecmodificacion: Date;

  @Column({ default: 1 })
  puntos: number;

  @Column({ type: 'tinyint', default: 0 })
  enprocesoc: number;

  // Relaciones Many To One
  @ManyToOne(() => Habitacion, (h) => h.movimientos)
  @JoinColumn({ name: 'id_habitacion' })
  habitacion: Habitacion;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosS)
  @JoinColumn({ name: 'id_usuarioS' })
  usuarioS: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosH)
  @JoinColumn({ name: 'id_usuarioH' })
  usuarioH: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosC)
  @JoinColumn({ name: 'id_usuarioC' })
  usuarioC: Usuario;

  @ManyToOne(() => StatusHabitacion, (sh) => sh.movimientos)
  @JoinColumn({ name: 'id_statusHabH' })
  statusHabitacion: StatusHabitacion;
}
