import { Router } from "express";
import { ReportesController } from "../controllers/ReportesController";

const routes = Router();

routes.get('/tipoDeProblema', ReportesController.tipoDeProblema);
routes.get('/genero', ReportesController.genero);
routes.get('/edad', ReportesController.edad);
routes.get('/zonaProcedencia', ReportesController.zonaProcedencia);
routes.get('/rangoFecha', ReportesController.rangoFecha);
routes.get('/recursosInvertidos', ReportesController.recursosInvertidos);
routes.get('/combinacion', ReportesController.combinacion);

export default routes;