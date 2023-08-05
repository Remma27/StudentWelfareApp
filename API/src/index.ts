import express = require("express");
import { AppDataSource } from "./data-source"
import helmet from "helmet";
import cors = require("cors");
import routes from "./routes";

AppDataSource.initialize().then(async () => {

   const port = process.env.port || 3000;

   const app = express();

   app.use(cors());
   app.use(helmet());
   app.use(express.json());

   app.use('/', routes);

   app.listen(port, () => { console.log(`Servidor en el puerto: ${port}`) });

   //instalar librerias y @types y VER DATA-SOURCE.ts

}).catch(error => console.log(error))
