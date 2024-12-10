import { Amenitie } from 'src/modules/admin/amenitie/entities/amenitie.entity';
import { Habitacion } from 'src/modules/admin/habitacion/entities/habitacion.entity';
import { Piso } from 'src/modules/admin/piso/entities/piso.entity';
import { StatusHabitacion } from 'src/modules/admin/status-habitacion/entities/status-habitacion.entity';
import { StatusLimpieza } from 'src/modules/admin/status-limpieza/entities/status-limpieza.entity';
import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Empresas' })
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: 1,
  })
  id_apihotelero: number;

  @Column({
    type: 'varchar',
    length: 25,
    default: '',
  })
  ruc: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: '',
  })
  razonsocial: string;

  @Column({
    type: 'varchar',
    length: 500,
    default: '',
  })
  logo: string;

  @Column({
    type: 'char',
    length: 1,
    default: 'S',
  })
  activo: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
  })
  usuario: string;

  @Column({
    type: 'datetime',
    default: '',
  })
  fecregistro: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
  })
  usuariomodifica: string;

  @Column({
    type: 'datetime',
    default: '',
  })
  fecmodificacion: Date;

  // Relaciones One To Many //

  @OneToMany(() => Movimiento, (m) => m.empresa)
  movimientos: Movimiento[];

  @OneToMany(() => Amenitie, (a) => a.empresa)
  amenities: Amenitie[];

  @OneToMany(() => Habitacion, (h) => h.empresa)
  habitaciones: Habitacion[];

  @OneToMany(() => Piso, (p) => p.empresa)
  pisos: Piso[]

  @OneToMany(() => StatusHabitacion, (s) => s.empresa)
  statusHabitaciones: StatusHabitacion[];

  @OneToMany(
    () => StatusLimpieza,
    (sl) => sl.empresa
  )
  statusLimpiezas: StatusLimpieza[];

  @OneToMany(
    () => Usuario,
    (u) => u.empresa
  )
  usuarios: Usuario[]
}
