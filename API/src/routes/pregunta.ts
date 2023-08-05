import { Router } from "express";
import PreguntaController from "../controllers/PreguntaController";

const routes = Router();

routes.get('/', PreguntaController.getAll);
routes.get('/:id', PreguntaController.getById);
routes.post('/', PreguntaController.insert);
routes.patch('/', PreguntaController.update);
routes.delete('/:id', PreguntaController.delete);

export default routes;