import { Router } from "express";
import RespuestaController from "../controllers/RespuestaController";

const routes = Router();

routes.get('/', RespuestaController.getAll);
routes.get('/:id', RespuestaController.getById);
routes.post('/', RespuestaController.insert);
routes.patch('/', RespuestaController.update);
routes.delete('/:id', RespuestaController.delete);

export default routes;