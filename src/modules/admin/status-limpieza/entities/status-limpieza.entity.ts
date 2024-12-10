import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
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

  @Column({ type: 'varchar', default: '', nullable: false })
  usuario: string;

  @CreateDateColumn({ type: 'datetime' })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '', nullable: true })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecmodificacion: Date;

  @ManyToOne(() => Empresa, (e) => e.statusLimpiezas)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @OneToMany(() => Movimiento, (m) => m.statusLimpH)
  movimientosH: Movimiento[];

  @OneToMany(() => Movimiento, (m) => m.statusLimpC)
  movimientosC: Movimiento[];

  @OneToMany(() => Movimiento, (m) => m.statusLimpS)
  movimientosS: Movimiento[];
}
