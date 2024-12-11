import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TipoUsuarios')
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  id_empresa: number;

  @Column({ type: 'char', length: 1, default: '' })
  codigo: string;

  @Column({ type: 'varchar', default: '' })
  descripcion: string;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @OneToMany(
    () => Usuario,
    (usuario: Usuario) => usuario.tipoUsuario,
  )
  usuarios: Usuario[]
}
