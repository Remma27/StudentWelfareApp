import { Router } from "express";
import { ReportesController } from "../controllers/ReportesController";

const routes = Router();

routes.get('/', ReportesController.tipoDeProblema);
routes.get('/', ReportesController.genero);
routes.get('/', ReportesController.edad);
routes.get('/', ReportesController.zonaProcedencia);
routes.get('/', ReportesController.rangoFecha);
routes.get('/', ReportesController.recursosCompartidos);
routes.get('/', ReportesController.combinacion);

export default routes;