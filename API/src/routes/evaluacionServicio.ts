import { Router } from "express";
import EvaluacionServicioController from "../controllers/EvaluacionServicioController";

const routes = Router();

routes.get("/", EvaluacionServicioController.getAll);
routes.get("/:id", EvaluacionServicioController.getById);
routes.post("/", EvaluacionServicioController.insert);
routes.patch("/", EvaluacionServicioController.update);
routes.delete("/", EvaluacionServicioController.delete);

export default routes;
