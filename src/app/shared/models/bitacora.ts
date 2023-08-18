import { Estudiantes } from "./estudiantes";

export interface Bitacora {
    Bitacora_Id: number;
    Estudiante_Id: Estudiantes;
    Profesor_Cedula: number;
    Profesor_Nombre: string;
    Nombre_Curso: string;
    Fecha: Date;
    Observacion: string;
    Estado: boolean;
}