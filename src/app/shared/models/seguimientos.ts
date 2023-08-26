import { Citas } from './citas';

export interface Seguimientos {
  Seguimiento_Id: number;
  cita: Citas;
  Resumen_Cita: string;
  Fecha_Correspondiente: Date;
  Otra_Cita: boolean;
  Estado: boolean;
}
