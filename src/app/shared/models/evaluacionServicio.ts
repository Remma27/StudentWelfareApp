import { Estudiantes } from "./estudiantes";

export interface EvaluacionServicio {
    Evaluacion_Id: number;
    //estudiante o Estudiante_Id
    estudiante: Estudiantes;
    Estado: boolean;
}