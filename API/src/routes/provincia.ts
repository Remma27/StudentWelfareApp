import { Router } from 'express';
import ProvinciaController from '../controllers/ProvinciaController';

const routes = Router();

routes.get('/', ProvinciaController.getAll);
routes.get('/:Provincia_Id', ProvinciaController.getById);

export default routes;
