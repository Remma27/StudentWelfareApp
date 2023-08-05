import { Router } from "express";
import CuestionarioController from "../controllers/CuestionarioController";

const routes = Router();

routes.get("/", CuestionarioController.getAll);
routes.get("/:id", CuestionarioController.getById);
routes.post("/", CuestionarioController.insert);
routes.patch("/", CuestionarioController.update);
routes.delete("/:id", CuestionarioController.delete);

export default routes;
