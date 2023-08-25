import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Estudiante } from './entity/Estudiante';
import { Cita } from './entity/CIta';
import { BitacoraDocente } from './entity/BitacoraDocente';
import { Pregunta } from './entity/Pregunta';
import { Respuesta } from './entity/Respuesta';
import { Seguimiento } from './entity/Seguimiento';
import { Usuario } from './entity/Usuario';
import { EvaluacionServicio } from './entity/EvaluacionServicio';
import { Cuestionario } from './entity/Cuestionario';
import { Provincia } from './entity/Provincia';
import { Canton } from './entity/Canton';
import { Distrito } from './entity/Distrito';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'BienestarEstudiantil',
  synchronize: false,
  logging: false,
  entities: [
    Estudiante,
    Cita,
    BitacoraDocente,
    Pregunta,
    Respuesta,
    Seguimiento,
    Usuario,
    EvaluacionServicio,
    Cuestionario,
    Provincia,
    Canton,
    Distrito,
  ],
  migrations: [],
  subscribers: [],
});
