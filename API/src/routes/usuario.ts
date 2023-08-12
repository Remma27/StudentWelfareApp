import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import { tiempoSesion } from '../middlewares/tiempoSesion';

const routes = Router();

routes.get('/', UsuarioController.getAll);
routes.get('/:id', tiempoSesion, UsuarioController.getById);
routes.post('/', UsuarioController.insert);
routes.patch('/:id', UsuarioController.update);
routes.delete('/:id', UsuarioController.delete);

export default routes;
