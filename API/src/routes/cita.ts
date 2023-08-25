import { Router } from 'express';
import CitaController from '../controllers/CitaController';

const routes = Router();

routes.get('/', CitaController.getAll);
routes.get('/:id', CitaController.getById);
routes.get('/getEstado/:Estado', CitaController.getByEstado);
routes.post('/', CitaController.insert);
routes.patch('/', CitaController.update);
routes.delete('/:id', CitaController.delete);

export default routes;
