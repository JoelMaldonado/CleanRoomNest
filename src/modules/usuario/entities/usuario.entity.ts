import { Empresa } from 'src/modules/empresa/entities/empresa.entity';
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

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  codusu: string;

  @Column({ type: 'varchar', default: '' })
  nombres: string;

  @Column({ type: 'varchar', default: '' })
  apellidos: string;

  @Column({ type: 'varchar', default: '' })
  numdoc: string;

  @Column({ type: 'varchar', default: '' })
  contrasenia: string;

  @Column({ type: 'varchar', default: '' })
  correo: string;

  @Column({ type: 'varchar', default: '' })
  telefono: string;

  @Column({ type: 'varchar', default: '' })
  foto: string;

  @Column({ type: 'char', default: 'S' })
  activo: string;

  @Column({ type: 'int', nullable: true })
  id_tipousuario: number;

  @Column({ type: 'datetime', nullable: true, default: null })
  fecingreso: Date;

  @Column({ type: 'decimal', default: 0 })
  costohora: number;

  @Column({ type: 'varchar', default: '' })
  usuario: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecregistro: Date;

  @Column({ type: 'varchar', default: '' })
  usuariomodifica: string;

  @UpdateDateColumn({ type: 'datetime', nullable: true, default: null })
  fecmodificacion: Date;

  @Column({ type: 'varchar', default: '' })
  token: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  fecactualizacion: Date;

  @Column({ type: 'nvarchar', default: '' })
  plataforma: string;

  @ManyToOne(
    () => Empresa,
    (e) => e.usuarios,
  )
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @OneToMany(
    () => Movimiento,
    (movimiento) => movimiento.usuarioH,
  )
  movimientosH: Movimiento[]

  @OneToMany(
    () => Movimiento,
    (movimiento) => movimiento.usuarioS,
  )
  movimientosS: Movimiento[]

  @OneToMany(
    () => Movimiento,
    (movimiento) => movimiento.usuarioC,
  )
  movimientosC: Movimiento[]
}
