import { Usuario } from "src/modules/usuario/entities/usuario.entity";

export const mapUsuario = (usuario: Usuario) => {
  if (!usuario) {
    return null;
  }

  const { id, empresa, codusu, nombres, apellidos, numdoc, contrasenia, correo, telefono, foto, activo, fecingreso, costohora, token, tipoUsuario } = usuario;

  return {
    id: id ?? null,
    idEmpresa: empresa.id ?? null,
    codusu: codusu ?? null,
    nombres: nombres ?? null,
    apellidos: apellidos ?? null,
    numDoc: numdoc ?? null,
    contrasenia: contrasenia ?? null,
    correo: correo ?? null,
    telefono: telefono ?? null,
    foto: foto ?? null,
    activo: activo == 'S',
    fecIngreso: fecingreso ?? null,
    costoHora: costohora ?? null,
    token: token ?? null,
    idTipoUsuario: tipoUsuario.id ?? null,
    codTipoUsuario: tipoUsuario.codigo ?? null,
    tipoUsuario: tipoUsuario.descripcion ?? null,
  };
};
