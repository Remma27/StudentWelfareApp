import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { EvaluacionServicio } from '../entity/EvaluacionServicio';
import { validate } from 'class-validator';
import { Estudiante } from '../entity/Estudiante';

export class EvaluacionServicioController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);
      const evaluacion = await EvaluacionRepo.find({
        where: { Estado: true },
        relations: { estudiante: true },
      });
      if (evaluacion.length === 0)
        return res
          .status(404)
          .json({ message: 'No hay informacion de evaluaciones de servicio' });
      return res.status(200).json(evaluacion);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Evaluacion_Id = parseInt(req.params['id']);
      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);
      let evaluacion;
      try {
        evaluacion = await EvaluacionRepo.findOneOrFail({
          where: { Evaluacion_Id, Estado: true },
          relations: { estudiante: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Informacion no encontrada' });
      }
      return res.status(200).json(evaluacion);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static insert = async (req: Request, res: Response) => {
    /*formato
        
      "Estudiante_Id": 1,
        
    */
    try {
      const { Estudiante_Id } = req.body;

      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);

      const repoEstudiante = AppDataSource.getRepository(Estudiante);
      const estudiante = await repoEstudiante.findOne({
        where: { Estudiante_Id, Estado: true },
      });
      if (!estudiante) {
        return res.status(400).json({ message: 'No existe el estudiante' });
      }

      let evaluacion = new EvaluacionServicio();
      evaluacion.estudiante = Estudiante_Id;
      evaluacion.Estado = true;

      const erros = await validate(evaluacion, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await EvaluacionRepo.save(evaluacion);
        return res.status(201).json({
          message: 'La evaluacion del servicio ha sido insertada correctamente',
        });
      } catch (error) {
        return res.status(400).json({
          message:
            'La evaluacion del servicio no ha podido ser insertada correctamente',
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    /*formato
        
      "Evaluacion_Id": 3,
      "Estudiante_Id": 2,
        
    */
    try {
      const { Evaluacion_Id, Estudiante_Id } = req.body;

      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);
      const EvaluacionExistente = await EvaluacionRepo.findOne({
        where: { Evaluacion_Id },
      });
      if (!EvaluacionExistente)
        return res
          .status(400)
          .json({ message: 'No existe evaluacion de servicios' });

      const repoEstudiante = AppDataSource.getRepository(Estudiante);
      const estudiante = await repoEstudiante.findOne({
        where: { Estudiante_Id, Estado: true },
      });
      if (!estudiante) {
        return res.status(400).json({ message: 'No existe el estudiante' });
      }
      let evaluacion = new EvaluacionServicio();
      evaluacion.estudiante = Estudiante_Id;
      evaluacion.Estado = true;

      const erros = await validate(evaluacion, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await EvaluacionRepo.save(evaluacion);
        return res.status(201).json({
          message: 'La evaluacion del servicio ha sido insertada correctamente',
        });
      } catch (error) {
        return res.status(400).json({
          message:
            'La evaluacion del servicio no ha podido ser insertada correctamente',
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const Evaluacion_Id = parseInt(req.params['id']);
      if (!Evaluacion_Id)
        return res.status(400).json({ message: 'Debe indicar el id' });
      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);
      let evalu: EvaluacionServicio;
      try {
        evalu = await EvaluacionRepo.findOneOrFail({
          where: { Evaluacion_Id, Estado: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ message: 'Informacion de sostenibilidad no encontrada' });
      }
      evalu.Estado = false;
      const erros = await validate(evalu, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await EvaluacionRepo.save(evalu);
        return res.status(200).json({
          message: 'evaluacion de servicio eliminada correctamente',
        });
      } catch (error) {
        return res.status(400).json({
          message: 'No se ha podido eliminar la evaluacion de servicio',
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default EvaluacionServicioController;
