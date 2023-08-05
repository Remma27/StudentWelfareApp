import { Router } from "express";
import RespuestaDocumentoController from "../controllers/RespuestaDocumentoController";

const routes = Router();

routes.get('/', RespuestaDocumentoController.getAll);
routes.get('/:id', RespuestaDocumentoController.getById);
routes.post('/', RespuestaDocumentoController.insert);
routes.patch('/', RespuestaDocumentoController.update);
routes.delete('/:id', RespuestaDocumentoController.delete);

export default routes;