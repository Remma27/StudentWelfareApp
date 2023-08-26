import { Cuestionario } from './cuestionario';
import { Estudiantes } from './estudiantes';

export interface Pregunta {
  Pregunta_Id: number;
  cuestionario: Cuestionario;
  Pregunta_Cuestionario: string;
  Estado: boolean;
}
