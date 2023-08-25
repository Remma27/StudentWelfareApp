import { Bitacora } from "./bitacora";
import { Citas } from "./citas";
import { Estudiantes } from "./estudiantes";
import { EvaluacionServicio } from "./evaluacionServicio";
import { Seguimientos } from "./seguimientos";

export interface Reportes {
    Estudiantes?: Estudiantes[];
    Citas?: Citas[];
    Seguimientos?: Seguimientos[];
    Evaluaciones?: EvaluacionServicio[];
    Bitacoras?: Bitacora[];
    //poner o quitar ?
}