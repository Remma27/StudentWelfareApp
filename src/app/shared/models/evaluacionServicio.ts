import { Estudiantes } from './estudiantes';

export interface EvaluacionServicio {
  Evaluacion_Id: number;
  estudiante: Estudiantes;
  Estado: boolean;
}
