import { Router } from "express";
import { BitacoraDocenteController } from "../controllers/BitacoraDocenteController";

const routes = Router();

routes.get('/', BitacoraDocenteController.getAll);
routes.get('/:id', BitacoraDocenteController.getById);
routes.post('/', BitacoraDocenteController.insert);
routes.patch('/', BitacoraDocenteController.update);
routes.delete('/:id', BitacoraDocenteController.delete);

export default routes;