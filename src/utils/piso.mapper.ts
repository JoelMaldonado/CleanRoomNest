import { Piso } from 'src/modules/admin/piso/entities/piso.entity';

export const mapPiso = (mov: Piso) => {
  if (!mov) {
    return null;
  }

  const { id, empresa, numpiso, descripcion, habitaciones, activo } = mov;

  return {
    id: id ?? null,
    idEmpresa: empresa?.id ?? null,
    numPiso: numpiso ?? null,
    descripcion: descripcion ?? null,
    totalHabitaciones: habitaciones?.length ?? 0,
    activo: activo == 'S',
  };
};
