import { Estudiantes } from './estudiantes';

export interface Citas {
  Cita_Id: number;
  Estudiante_Id: Estudiantes;
  Encargado_Nombre: string;
  Observacion_Cita: string;
  Fecha_Cita: Date;
  Estado: boolean;
}
