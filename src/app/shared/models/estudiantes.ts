import { Distrito } from './distrito';

export interface Estudiantes {
  Estudiante_Id: number;
  Genero: string;
  Fecha_Nacimiento: Date;
  Telefono: number;
  Telefono2: number;
  Correo_Electronico: string;
  Distrito_Id: Distrito;
  Direccion_Exacta_Procedencia: string;
  Direccion_Exacta_Tiempo_Lectivo: string;
  Nacionalidad: string;
  Colegio_Procedencia: string;
  Ano_Graduacion_Secundaria: number;
  Estado: boolean;
}
