import { Router } from "express";
import SeguimientoController from "../controllers/SeguimientoController";

const routes = Router();

routes.get('/', SeguimientoController.getAll);
routes.get('/:id', SeguimientoController.getById);
routes.post('/', SeguimientoController.insert);
routes.patch('/', SeguimientoController.update);
routes.delete('/:id', SeguimientoController.delete);

export default routes;