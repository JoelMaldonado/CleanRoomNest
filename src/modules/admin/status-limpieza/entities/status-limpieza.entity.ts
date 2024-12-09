import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('StatusLimpieza')
export class StatusLimpieza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '', nullable: false })
  codigo: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  descripcion: string;

  @Column({ type: 'char', default: 'S', length: 1 })
  activo: string;

  @Column({ type: 'int', nullable: true })
  id_empresa: number;

  @Column({ type: 'varchar', default: '', nullable: false })
  usuario: string;

  @CreateDateColumn({ type: 'datetime' })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '', nullable: true })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecmodificacion: Date;

  @OneToMany(() => Movimiento, (m) => m.statusLimpH)
  movimientosH: Movimiento[];

  @OneToMany(() => Movimiento, (m) => m.statusLimpC)
  movimientosC: Movimiento[];

  @OneToMany(() => Movimiento, (m) => m.statusLimpS)
  movimientosS: Movimiento[];
}
