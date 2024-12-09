import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';

export const mapMovimiento = (mov: Movimiento) => {
  let tiempoTardado = ''
  if (mov.fechahorafC && mov.fechahoraiC) {
    const diff = mov.fechahorafC.getTime() - mov.fechahoraiC.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);
    const diffMinutes = Math.floor(diff / 1000 / 60) % 60;
    tiempoTardado = `${diffHours}h ${diffMinutes}m`;
  }
  return {
    id: mov.id,
    id_empresa: mov.id_empresa,
    statusHab: mov.statusHabitacion ?? null,
    fechaHoraH: mov.fechahoraH ?? null,
    fechaInicio: mov.fechahoraiC ?? null,
    fechaFin: mov.fechahorafC ?? null,
    fechaHoraS: mov.fechahoraS ?? null,
    tiempo: tiempoTardado,
    puntos: mov.puntos ?? 0,
    usuario: mov.usuario ?? null,
    enProceso: mov.enprocesoc == 1,
    habitacion: {
      id: mov.habitacion?.id ?? null,
      codigo: mov.habitacion?.codigo ?? null,
      descripcion: mov.habitacion?.descripcion ?? null,
      idTipoHab: mov.habitacion?.tipoHabitacion?.id ?? null,
      codTipoHab: mov.habitacion?.tipoHabitacion?.codigo ?? null,
      tipoHab: mov.habitacion?.tipoHabitacion?.descripcion ?? null,
      idPiso: mov.habitacion?.piso?.id ?? null,
      numPiso: mov.habitacion?.piso?.numpiso ?? null,
      piso: mov.habitacion?.piso?.descripcion ?? null,
    },
    usuarios: {
      usuarioH: {
        id: mov.usuarioH?.id ?? null,
        nombres: mov.usuarioH?.nombres ?? null,
      },
      usuarioS: {
        id: mov.usuarioS?.id ?? null,
        nombres: mov.usuarioS?.nombres ?? null,
      },
      usuarioC: {
        id: mov.usuarioC?.id ?? null,
        nombres: mov.usuarioC?.nombres ?? null,
      },
    },
    fotos: {
      banio: mov.fotobanio ?? null,
      habitacion: mov.fotohabitacion ?? null,
      extra: mov.fotoextra ?? null,
    }
  };
};
