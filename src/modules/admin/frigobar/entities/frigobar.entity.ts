import { MovFrigobar } from 'src/modules/movimiento/entities/mov-frigobar.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('Frigobar')
export class Frigobar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '', length: 255 })
  codigo: string;

  @Column({ type: 'varchar', default: '', length: 255 })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio: number;

  @Column({ type: 'char', default: 'S', length: 1 })
  activo: string;

  @Column({ type: 'int', nullable: false })
  id_empresa: number;

  @Column({ type: 'varchar', default: '', length: 255 })
  usuario: string;

  @CreateDateColumn({ type: 'datetime' })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '', length: 255 })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  fecmodificacion: Date;

  @OneToMany(
    () => MovFrigobar,
    m => m.frigobar
  )
  movFrigobar: MovFrigobar[]
}
