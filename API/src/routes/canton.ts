import { Router } from 'express';
import CantonController from '../controllers/CantonController';

const routes = Router();

routes.get('/', CantonController.getAll);
routes.get('/:Canton_Id', CantonController.getById);

export default routes;
