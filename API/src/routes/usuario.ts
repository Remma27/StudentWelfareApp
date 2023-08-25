import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import { checkjwt } from '../middlewares/jwt';

const routes = Router();

routes.get('/', UsuarioController.getAll);
routes.get('/:id', /*checkjwt,*/ UsuarioController.getById);
routes.post('/', UsuarioController.insert);
routes.post('/compare-password', UsuarioController.CompararContrasena);
routes.patch('/:id', UsuarioController.update);
routes.delete('/:id', UsuarioController.delete);

export default routes;
