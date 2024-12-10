import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { encriptar } from 'src/utils/encriptar.utils';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(loginDto: LoginDto) {
    const { user, pass, ruc } = loginDto;
    const usuario = await this.usuarioService.findByLogin(user, ruc);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const passEncriptada = encriptar(pass);

    if (passEncriptada !== usuario.contrasenia) {
        throw new UnauthorizedException('Contraseña incorrecta', usuario.contrasenia);
    }

    const payload = {
        sub: usuario.id,
        id_empresa: usuario.empresa.id
    }
    const token = this.jwtService.sign(payload);
    return {
        id: usuario.id,
        nombre: usuario.usuario,
        tipoUsuario: usuario.id_tipousuario,
        token: token
    };
  }
}
