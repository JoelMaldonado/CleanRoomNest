import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MovimientoModule } from './modules/movimiento/movimiento.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { AmenitieModule } from './modules/admin/amenitie/amenitie.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { HabitacionModule } from './modules/admin/habitacion/habitacion.module';
import { TipoHabitacionModule } from './modules/admin/tipo-habitacion/tipo-habitacion.module';
import { PisoModule } from './modules/admin/piso/piso.module';
import { StatusHabitacionModule } from './modules/admin/status-habitacion/status-habitacion.module';
import { StatusLimpiezaModule } from './modules/admin/status-limpieza/status-limpieza.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      options: {
        encrypt: true,
        trustServerCertificate: true
      },
      autoLoadEntities: true,
      synchronize: false
    }),
    AuthModule,
    MovimientoModule,
    EmpresaModule,
    AmenitieModule,
    UsuarioModule,
    HabitacionModule,
    TipoHabitacionModule,
    PisoModule,
    StatusHabitacionModule,
    StatusLimpiezaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}