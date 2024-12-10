import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movimiento } from './movimiento.entity';
import { RopaBlanca } from 'src/modules/admin/ropa-blanca/entities/ropa-blanca.entity';

@Entity('MovRopaBlanca')
export class MovRopaBlanca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  id_movimiento: number;

  @Column({ type: 'int', nullable: false })
  id_empresa: number;

  @Column({ type: 'int', default: 0 })
  cantidadmaestro: number;

  @Column({ type: 'int', default: 0 })
  cantidad_in: number;

  @Column({ type: 'int', default: 0 })
  cantidad_out: number;

  @Column({ type: 'varchar', default: '', length: 255 })
  usuario: string;

  @CreateDateColumn({ type: 'datetime' })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '', length: 255 })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecmodificacion: Date;

  @ManyToOne(() => Movimiento, (m) => m.ropaBlanca)
  @JoinColumn({ name: 'id_movimiento' })
  movimiento: Movimiento;

  @ManyToOne(() => RopaBlanca, (rb) => rb.movRopaBlanca)
  @JoinColumn({ name: 'id_ropablanca' })
  ropaBlanca: RopaBlanca;
}
