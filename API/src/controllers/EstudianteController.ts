import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Estudiante } from '../entity/Estudiante';
import { validate } from 'class-validator';
import { Distrito } from '../entity/Distrito';

export class EstudianteController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const estudiantesRepo = AppDataSource.getRepository(Estudiante);
      const estudiantes = await estudiantesRepo.find({
        where: { Estado: true },
        relations: { bitacora: true, cita: true, respuestas: true },
      });
      if (estudiantes.length === 0)
        return res.status(404).json({ message: 'No hay estudiantes activos' });
      return res.status(200).json(estudiantes);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Estudiante_Id = parseInt(req.params['id']);
      const estudiantesRepo = AppDataSource.getRepository(Estudiante);
      let estudiante;
      try {
        estudiante = await estudiantesRepo.findOneOrFail({
          where: { Estudiante_Id, Estado: true },
          relations: { bitacora: true, cita: true, respuestas: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ message: 'Estudiante no encontrado o inactivo' });
      }
      return res.status(200).json(estudiante);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static insert = async (req: Request, res: Response) => {
    /*formato
{
    "Estudiante_Id": 604800970,
    "Genero": "M",
    "Fecha_Nacimiento": "2003-07-27",
    "Telefono": 12232132,
    "Telefono2": 21233221,
    "Correo_Electronico": "emma@gmail.com",
    "distrito": 23223,
    "Direccion_Exacta_Procedencia": "Los almendros barranca pun",
    "Direccion_Tiempo_Lectivo": "El Roble Puntarenas",
    "Nacionalidad": "C",
    "Colegio_Procedencia": "Tecnico profesional de punt",
    "Ano_Graduacion_Secundaria": 2020
}
        */
    try {
      const {
        Estudiante_Id,
        Genero,
        Fecha_Nacimiento,
        Telefono,
        Telefono2,
        Correo_Electronico,
        distrito,
        Direccion_Exacta_Procedencia,
        Direccion_Exacta_Tiempo_Lectivo,
        Nacionalidad,
        Colegio_Procedencia,
        Ano_Graduacion_Secundaria,
      } = req.body;
      const estudiantesRepo = AppDataSource.getRepository(Estudiante);
      const estudianteExistente = await estudiantesRepo.findOne({
        where: { Estudiante_Id, Estado: true },
      });
      if (estudianteExistente)
        return res.status(400).json({ message: 'Estudiante existente' });

      const distritoRepo = AppDataSource.getRepository(Distrito);
      const distritoExistente = await distritoRepo.findOne({
        where: { Distrito_Id: distrito },
      });
      if (!distritoExistente) {
        return res.status(400).json({ message: 'Distrito no existe' });
      }
      let estudiante = new Estudiante();
      estudiante.Estudiante_Id = Estudiante_Id;
      estudiante.Genero = Genero;
      estudiante.Fecha_Nacimiento = Fecha_Nacimiento;
      estudiante.distrito = distrito;
      estudiante.Nacionalidad = Nacionalidad;
      estudiante.Colegio_Procedencia = Colegio_Procedencia;
      estudiante.Ano_Graduacion_Secundaria = Ano_Graduacion_Secundaria;

      estudiante.Telefono = Telefono;
      estudiante.Telefono2 = Telefono2;
      estudiante.Correo_Electronico = Correo_Electronico;
      estudiante.Direccion_Exacta_Procedencia = Direccion_Exacta_Procedencia;
      estudiante.Direccion_Exacta_Tiempo_Lectivo = Direccion_Exacta_Tiempo_Lectivo;
      estudiante.Estado = true;

      const errores = await validate(estudiante, {
        validationError: { target: false, value: false },
      });
      if (errores.length > 0) {
        console.log(errores);
        return res.status(400).json(errores);
      }
      try {
        await estudiantesRepo.save(estudiante);
        return res
          .status(201)
          .json({ message: 'Estudiante insertado correctamente' });
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: 'No se pudo insertar el estudiante' });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    /*formato
{
    "Estudiante_Id":604800970,
    "Genero": "M",
    "Fecha_Nacimiento": "2003-07-27",
    "Telefono": 12232132,
    "Telefono2": 21233221,
    "Correo_Electronico": "emma@gmail.com",
    "distrito": 23223,
    "Direccion_Exacta_Procedencia": "Los almendros barranca pun",
    "Direccion_Tiempo_Lectivo": "El Roble Puntarenas",
    "Nacionalidad": "C",
    "Colegio_Procedencia": "Tecnico profesional de punt",
    "Ano_Graduacion_Secundaria": 2020
}
        */
    try {
      const {
        Estudiante_Id,
        Genero,
        Fecha_Nacimiento,
        Telefono,
        Telefono2,
        Correo_Electronico,
        distrito,
        Direccion_Exacta_Procedencia,
        Direccion_Tiempo_Lectivo,
        Nacionalidad,
        Colegio_Procedencia,
        Ano_Graduacion_Secundaria,
      } = req.body;
      const estudiantesRepo = AppDataSource.getRepository(Estudiante);
      const estudianteExistente = await estudiantesRepo.findOne({
        where: { Estudiante_Id },
      });
      if (!estudianteExistente)
        return res.status(404).json({ message: 'Estudiante inexistente' });

      const distritoRepo = AppDataSource.getRepository(Distrito);
      const distritoExistente = await distritoRepo.findOne({
        where: { Distrito_Id: distrito },
      });
      if (!distritoExistente) {
        return res.status(400).json({ message: 'Distrito no existe' });
      }
      let estudiante = new Estudiante();
      estudiante.Genero = Genero;
      estudiante.Fecha_Nacimiento = Fecha_Nacimiento;
      estudiante.Telefono = Telefono;
      estudiante.Telefono2 = Telefono2;
      estudiante.Correo_Electronico = Correo_Electronico;
      estudiante.distrito = distrito;
      estudiante.Direccion_Exacta_Procedencia = Direccion_Exacta_Procedencia;
      estudiante.Direccion_Exacta_Tiempo_Lectivo = Direccion_Tiempo_Lectivo;
      estudiante.Nacionalidad = Nacionalidad;
      estudiante.Colegio_Procedencia = Colegio_Procedencia;
      estudiante.Ano_Graduacion_Secundaria = Ano_Graduacion_Secundaria;
      estudiante.Estado = true;
      const errores = await validate(estudiante, {
        validationError: { target: false, value: false },
      });
      if (errores.length > 0) {
        return res.status(400).json(errores);
      }
      try {
        await estudiantesRepo.save(estudiante);
        return res
          .status(200)
          .json({ message: 'Estudiante actualizado correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo actualizar el estudiante' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const Estudiante_Id = parseInt(req.params['id']);
      if (!Estudiante_Id)
        return res.status(404).json({ message: 'Debe ingresar un id' });
      const estudiantesRepo = AppDataSource.getRepository(Estudiante);
      let estudiante: Estudiante;
      try {
        estudiante = await estudiantesRepo.findOneOrFail({
          where: { Estudiante_Id, Estado: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      estudiante.Estado = false;
      const errores = await validate(estudiante, {
        validationError: { target: false, value: false },
      });
      if (errores.length > 0) {
        return res.status(400).json(errores);
      }
      try {
        await estudiantesRepo.save(estudiante);
        return res
          .status(200)
          .json({ message: 'Estudiante eliminado correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo eliminar el estudiante' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default EstudianteController;
