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
import { Amenitie } from 'src/modules/admin/amenitie/entities/amenitie.entity';

@Entity('MovAmenities')
export class MovAmenities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  id_empresa: number;

  @Column({ type: 'int', default: 0 })
  cantidadmaestro: number;

  @Column({ type: 'int', default: 0 })
  cantidad: number;

  @Column({ type: 'varchar', default: '', length: 255 })
  usuario: string;

  @CreateDateColumn({ type: 'datetime' })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '', length: 255 })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecmodificacion: Date;

  @ManyToOne(() => Amenitie, (a) => a.movAmenities)
  @JoinColumn({ name: 'id_amenities' })
  amenitie: Amenitie;

  @ManyToOne(() => Movimiento, (m) => m.amenities)
  @JoinColumn({ name: 'id_movimiento' })
  movimiento: Movimiento;
}
