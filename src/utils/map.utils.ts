import { StatusLimpieza } from 'src/modules/admin/status-limpieza/entities/status-limpieza.entity';
import { Movimiento } from 'src/modules/movimiento/entities/movimiento.entity';

export const mapStatusLimpieza = (status?: StatusLimpieza) => {
  return {
    id: status?.id ?? null,
    codigo: status?.codigo ?? null,
    descripcion: status?.descripcion ?? null,
  };
};

export const mapMovimiento = (mov: Movimiento) => {
  let tiempoTardado = '';
  if (mov.fechahorafC && mov.fechahoraiC) {
    const diff = mov.fechahorafC.getTime() - mov.fechahoraiC.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);
    const diffMinutes = Math.floor(diff / 1000 / 60) % 60;
    tiempoTardado = `${diffHours}h ${diffMinutes}m`;
  }
  return {
    id: mov.id,
    empresa: {
      id: mov.empresa.id ?? null,
      nombre: mov.empresa?.razonsocial ?? null,
    },
    habitacion: {
      habitacion: {
        id: mov.habitacion?.id ?? null,
        codigo: mov.habitacion?.codigo ?? null,
        descripcion: mov.habitacion?.descripcion ?? null,
      },
      tipoHab: {
        id: mov.habitacion?.tipoHabitacion?.id ?? null,
        codigo: mov.habitacion?.tipoHabitacion?.codigo ?? null,
        descripcion: mov.habitacion?.tipoHabitacion?.descripcion ?? null,
      },
      piso: {
        id: mov.habitacion?.piso?.id ?? null,
        codigo: mov.habitacion?.piso?.numpiso ?? null,
        descripcion: mov.habitacion?.piso?.descripcion ?? null,
      },
    },
    housekeeping: {
      id: mov.usuarioH?.id ?? null,
      nombres: mov.usuarioH?.nombres ?? null,
      status: mapStatusLimpieza(mov.statusLimpH),
      fechaHoraH: mov.fechahoraH ?? null,
    },
    cuartelero: {
      id: mov.usuarioC?.id ?? null,
      nombres: mov.usuarioC?.nombres ?? null,
      status: mapStatusLimpieza(mov.statusLimpC),
      fechaInicio: mov.fechahoraiC ?? null,
      fechaFin: mov.fechahorafC ?? null,
      tiempo: tiempoTardado,
    },
    supervisor: {
      id: mov.usuarioS?.id ?? null,
      nombres: mov.usuarioS?.nombres ?? null,
      status: mapStatusLimpieza(mov.statusLimpS),
      fechaHoraS: mov.fechahoraS ?? null,
      puntos: mov.puntos ?? 0,
    },
    observacion: mov?.observaciones ?? null,
    estadoHab: {
      id: mov.statusHabitacion?.id ?? null,
      codigo: mov.statusHabitacion?.codigo ?? null,
      descripcion: mov.statusHabitacion?.descripcion ?? null,
    },
    incidencia: {},
    usuario: mov.usuario ?? null,
    enProceso: mov.enprocesoc == 1,
    fotos: {
      banio: mov?.fotobanio ?? null,
      habitacion: mov?.fotohabitacion ?? null,
      extra: mov?.fotoextra ?? null,
    },
    amenities: [],
    ropablanca: [],
    frigobar: []
  };
};
