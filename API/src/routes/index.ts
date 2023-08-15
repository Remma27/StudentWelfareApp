import { Router } from "express";
import bitacoraDocente from "./bitacoraDocente";
import cita from "./cita";
import estudiante from "./estudiante";
import pregunta from "./pregunta";
import respuesta from "./respuesta";
import usuario from "./usuario";
import seguimiento from "./seguimiento";
import evaluacionServicio from "./evaluacionServicio";
import cuestionario from "./cuestionario";
import respuestaDocumento from "./respuestaDocumento";
import reportes from "./reportes";

const routes = Router();

routes.use("/Bitacoras", bitacoraDocente);
routes.use("/Citas", cita);
routes.use("/Estudiantes", estudiante);
routes.use("/Preguntas", pregunta);
routes.use("/Respuestas", respuesta);
routes.use("/Usuarios", usuario);
routes.use("/Seguimientos", seguimiento);
routes.use("/EvaluacionServicio", evaluacionServicio);
routes.use("/Cuestionarios", cuestionario);
routes.use("/RespuestaDocumento", respuestaDocumento);
routes.use('/Reportes', reportes);

export default routes;
