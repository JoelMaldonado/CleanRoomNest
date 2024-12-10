import { Habitacion } from 'src/modules/admin/habitacion/entities/habitacion.entity';
import { StatusHabitacion } from 'src/modules/admin/status-habitacion/entities/status-habitacion.entity';
import { StatusLimpieza } from 'src/modules/admin/status-limpieza/entities/status-limpieza.entity';
import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
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
import { MovAmenities } from './mov-amenitie.entity';
import { MovRopaBlanca } from './mov-ropablanca.entity';
import { MovFrigobar } from './mov-frigobar.entity';

@Entity({ name: 'Movimiento' })
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true, default: null })
  fecha: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraH: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraiC: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahorafC: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraiS: Date;

  @Column({ type: 'datetime', nullable: true, default: null })
  fechahoraS: Date;

  @Column({ type: 'varchar', nullable: true, default: '' })
  observaciones: string;

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

  // General
  @ManyToOne(() => Habitacion, (h) => h.movimientos)
  @JoinColumn({ name: 'id_habitacion' })
  habitacion: Habitacion;

  @ManyToOne(() => Empresa, (e) => e.movimientos)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  // Usuarios
  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosS)
  @JoinColumn({ name: 'id_usuarioS' })
  usuarioS: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosH)
  @JoinColumn({ name: 'id_usuarioH' })
  usuarioH: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosC)
  @JoinColumn({ name: 'id_usuarioC' })
  usuarioC: Usuario;

  // Estados del Movimiento
  @ManyToOne(() => StatusLimpieza, (sl) => sl.movimientosH)
  @JoinColumn({ name: 'id_statusLimpH' })
  statusLimpH: StatusLimpieza;

  @ManyToOne(() => StatusLimpieza, (sl) => sl.movimientosC)
  @JoinColumn({ name: 'id_statusLimpC' })
  statusLimpC: StatusLimpieza;

  @ManyToOne(() => StatusLimpieza, (sl) => sl.movimientosS)
  @JoinColumn({ name: 'id_statusLimpS' })
  statusLimpS: StatusLimpieza;

  @ManyToOne(() => StatusHabitacion, (sh) => sh.movimientos)
  @JoinColumn({ name: 'id_statusHabH' })
  statusHabitacion: StatusHabitacion;

  // Movimiento Amenities
  @OneToMany(() => MovAmenities, (ma) => ma.movimiento)
  amenities: MovAmenities[]; // Movimiento Amenities

  @OneToMany(() => MovRopaBlanca, (mr) => mr.movimiento)
  ropaBlanca: MovRopaBlanca[]; // Movimiento Ropa Blanca

  @OneToMany(() => MovFrigobar, (mf) => mf.movimiento)
  frigobar: MovFrigobar[];
}
