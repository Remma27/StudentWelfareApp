import { Estudiantes } from './estudiantes';

export interface Citas {
  Cita_Id: number;
  estudiante: Estudiantes;
  Encargado_Nombre: string;
  Aprobacion_Cita: string;
  Fecha_Cita: Date;
  Estado: boolean;
}
