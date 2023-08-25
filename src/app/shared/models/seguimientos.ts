import { Citas } from './citas';

export interface Seguimientos {
  Seguimiento_Id: number;
  cita: Citas;
  Agenda_Cita: string;
  Resumen_Cita: string;
  Fecha_Correspondiente: Date;
  Estado: boolean;
}