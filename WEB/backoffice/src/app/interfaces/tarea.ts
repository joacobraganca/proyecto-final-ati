enum Status {
  pendiente = 'pendiente',
  enCurso = 'en curso',
  cerrado = 'cerrado',
}

export interface Tarea {
  name: string;
  dateTime: string;
  status: Status;
  assignedUser: string;
  assignedHealthHome: string;
}
