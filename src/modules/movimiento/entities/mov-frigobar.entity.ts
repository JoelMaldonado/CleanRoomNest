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
import { Frigobar } from 'src/modules/admin/frigobar/entities/frigobar.entity';

@Entity('MovFrigobar')
export class MovFrigobar {
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

  @ManyToOne(
    () => Movimiento,
    m => m.frigobar
  )
  @JoinColumn({ name: 'id_movimiento' })
  movimiento: Movimiento

  @ManyToOne(
    () => Frigobar,
    f => f.movFrigobar
  )
  @JoinColumn({ name: 'id_empresa' })
  frigobar: Frigobar
}
