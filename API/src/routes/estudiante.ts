import { Router } from "express";

import { EstudianteController } from "../controllers/EstudianteController";

const routes = Router();

routes.get('/', EstudianteController.getAll);
routes.get('/:id', EstudianteController.getById);
routes.post('/', EstudianteController.insert);
routes.patch('/', EstudianteController.update);
routes.delete('/:id', EstudianteController.delete);

export default routes;