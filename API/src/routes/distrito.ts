import { Router } from 'express';
import DistritoController from '../controllers/DistritoController';

const routes = Router();

routes.get('/', DistritoController.getAll);
routes.get('/:Distrito_Id', DistritoController.getById);

export default routes;
