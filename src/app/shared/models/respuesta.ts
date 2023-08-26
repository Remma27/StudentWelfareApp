import { Cuestionario } from './cuestionario';
import { Estudiantes } from './estudiantes';
import { EvaluacionServicio } from './evaluacionServicio';
import { Pregunta } from './pregunta';

export interface Respuesta {
  Respuesta_Id: number;
  pregunta: Pregunta;
  estudiante: Estudiantes;
  evaluacionServicio: EvaluacionServicio;
  cuestionario: Cuestionario;
  Respuesta_Cuestionario: string;
  Estado: boolean;
}
