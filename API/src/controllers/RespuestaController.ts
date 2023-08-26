import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Respuesta } from '../entity/Respuesta';
import { validate } from 'class-validator';
import { Pregunta } from '../entity/Pregunta';
import { EvaluacionServicio } from '../entity/EvaluacionServicio';
import { Estudiante } from '../entity/Estudiante';
import { Cuestionario } from '../entity/Cuestionario';

export class RespuestaController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const reespuestaRepo = AppDataSource.getRepository(Respuesta);
      const respuestas = await reespuestaRepo.find({
        where: { Estado: true },
        relations: { pregunta: true, cuestionario: true, estudiante: true },
      });
      if (respuestas.length === 0)
        return res.status(404).json({ message: 'No hay respuestas activas' });
      return res.status(200).json(respuestas);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Respuesta_Id = parseInt(req.params['id']);
      if (!Respuesta_Id)
        return res.status(400).json({ message: 'Debe indicar el id' });
      const reespuestaRepo = AppDataSource.getRepository(Respuesta);
      let respuestas;
      try {
        respuestas = await reespuestaRepo.findOneOrFail({
          where: { Respuesta_Id, Estado: true },
          relations: { pregunta: true, cuestionario: true, estudiante: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ message: 'Respuesta no encontrada o inactiva' });
      }
      return res.status(200).json(respuestas);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static insert = async (req: Request, res: Response) => {
    /*formato
        "Pregunta_Id":1,
        "Evaluacion_Id":1,
        "Estudiante_Id":604800970,
        "Cuestionario_Id":1,
        "Respuesta_Cuestionario":3
        */
    try {
      const {
        Pregunta_Id,
        Evaluacion_Id,
        Estudiante_Id,
        Cuestionario_Id,
        Respuesta_Cuestionario,
      } = req.body;

      const reespuestaRepo = AppDataSource.getRepository(Respuesta);

      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      const preguntaExistente = await preguntaRepo.findOne({
        where: { Pregunta_Id, Estado: true },
      });

      if (!preguntaExistente) {
        return res.status(400).json({ message: 'La pregunta no existe' });
      }

      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);
      const evaluacionExistente = await EvaluacionRepo.findOne({
        where: { Evaluacion_Id, Estado: true },
      });

      if (!evaluacionExistente) {
        return res.status(400).json({ message: 'La evaluacion no existe' });
      }

      const EstudianteRepo = AppDataSource.getRepository(Estudiante);
      const estudianteExistente = await EstudianteRepo.findOne({
        where: { Estudiante_Id, Estado: true },
      });

      if (!estudianteExistente) {
        return res.status(400).json({ message: 'El estudiante no existe' });
      }

      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const cuestionarioExistente = await CuestionarioRepo.findOne({
        where: { Cuestionario_Id, Estado: true },
      });

      if (!cuestionarioExistente) {
        return res.status(400).json({ message: 'El cuestionario no existe' });
      }

      let respuesta = new Respuesta();
      respuesta.pregunta = Pregunta_Id;
      respuesta.evaluacionServicio = Evaluacion_Id;
      respuesta.estudiante = Estudiante_Id;
      respuesta.cuestionario = Cuestionario_Id;
      respuesta.Respuesta_Cuestionario = Respuesta_Cuestionario;
      respuesta.Estado = true;
      const erros = await validate(respuesta, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await reespuestaRepo.save(respuesta);
        return res
          .status(201)
          .json({ message: 'Respuesta insertada correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo insertar la respuesta' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    /*formato
        "Respuesta_Id":1,
        "Pregunta_Id":1,
        "Evaluacion_Id":1,
        "EstudianteId:1,
        "Cuestionario_Id":1,
        "Respuesta_Cuestionario":3
        */
    try {
      const {
        Respuesta_Id,
        Pregunta_Id,
        Evaluacion_Id,
        Estudiante_Id,
        Cuestionario_Id,
        Respuesta_Cuestionario,
      } = req.body;
      const reespuestaRepo = AppDataSource.getRepository(Respuesta);
      const respuestaExistente = await reespuestaRepo.findOne({
        where: { Respuesta_Id },
      });
      if (!respuestaExistente)
        return res.status(400).json({ message: 'Respuesta inexistente' });

      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      const preguntaExistente = await preguntaRepo.findOne({
        where: { Pregunta_Id, Estado: true },
      });

      if (!preguntaExistente) {
        return res.status(400).json({ message: 'La pregunta no existe' });
      }

      const EvaluacionRepo = AppDataSource.getRepository(EvaluacionServicio);
      const evaluacionExistente = await EvaluacionRepo.findOne({
        where: { Evaluacion_Id, Estado: true },
      });

      if (!evaluacionExistente) {
        return res.status(400).json({ message: 'La evaluacion no existe' });
      }

      const EstudianteRepo = AppDataSource.getRepository(Estudiante);
      const estudianteExistente = await EstudianteRepo.findOne({
        where: { Estudiante_Id, Estado: true },
      });

      if (!estudianteExistente) {
        return res.status(400).json({ message: 'El estudiante no existe' });
      }

      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const cuestionarioExistente = await CuestionarioRepo.findOne({
        where: { Cuestionario_Id, Estado: true },
      });

      if (!cuestionarioExistente) {
        return res.status(400).json({ message: 'El cuestionario no existe' });
      }
      let respuesta = new Respuesta();
      respuesta.pregunta = Pregunta_Id;
      respuesta.evaluacionServicio = Evaluacion_Id;
      respuesta.estudiante = Estudiante_Id;
      respuesta.cuestionario = Cuestionario_Id;
      respuesta.Respuesta_Cuestionario = Respuesta_Cuestionario;
      respuesta.Estado = true;
      const erros = await validate(respuesta, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await reespuestaRepo.save(respuesta);
        return res
          .status(200)
          .json({ message: 'Respuesta actualizada correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo actualizar la respuesta' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const Respuesta_Id = parseInt(req.params['id']);
      const reespuestaRepo = AppDataSource.getRepository(Respuesta);
      let respuesta: Respuesta;
      try {
        respuesta = await reespuestaRepo.findOneOrFail({
          where: { Respuesta_Id, Estado: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Respuesta no encontrada' });
      }
      respuesta.Estado = false;
      const erros = await validate(respuesta, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await reespuestaRepo.save(respuesta);
        return res
          .status(200)
          .json({ message: 'Respuesta eliminada correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo eliminar la respuesta' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default RespuestaController;
