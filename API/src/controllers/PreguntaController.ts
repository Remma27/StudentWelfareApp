import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Pregunta } from '../entity/Pregunta';
import { validate } from 'class-validator';
import { Cuestionario } from '../entity/Cuestionario';

export class PreguntaController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      const preguntas = await preguntaRepo.find({
        where: { Estado: true },
      });
      if (preguntas.length === 0)
        return res.status(404).json({ message: 'No hay preguntas activas' });
      return res.status(200).json(preguntas);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Pregunta_Id = parseInt(req.params['id']);
      if (!Pregunta_Id)
        return res.status(400).json({ message: 'Debe ingresar un id' });
      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      let preguntas;
      try {
        preguntas = await preguntaRepo.findOneOrFail({
          where: { Pregunta_Id, Estado: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ message: 'Pregunta no encontrada o inactiva' });
      }
      return res.status(200).json(preguntas);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static insert = async (req: Request, res: Response) => {
    /*  
        formato

        "Pregunta_Id":1,
        "Cuestionario_Id":1,
        "Pregunta_Cuestionario":90

        */
    try {
      const { Pregunta_Id, Cuestionario_Id, Pregunta_Cuestionario } = req.body;

      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      const preguntas = await preguntaRepo.findOne({
        where: { Estado: true, Pregunta_Id },
        relations: { cuestionario: true },
      });

      if (preguntas)
        return res.status(400).json({ message: 'Pregunta existente' });

      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const cuestionario = await CuestionarioRepo.findOne({
        where: { Cuestionario_Id, Estado: true },
      });

      if (!cuestionario) {
        return res
          .status(400)
          .json({ message: 'El cuestionario no existente' });
      }

      let pregunta = new Pregunta();
      pregunta.Pregunta_Id = Pregunta_Id;
      pregunta.cuestionario = Cuestionario_Id;
      pregunta.Pregunta_Cuestionario = Pregunta_Cuestionario;
      pregunta.Estado = true;
      const erros = await validate(pregunta, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await preguntaRepo.save(pregunta);
        return res
          .status(201)
          .json({ message: 'Pregunta insertada correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo insertar la pregunta' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    /*formato

        "Pregunta_Id":1,
        "Cuestionario_Id":1,
        "Pregunta_Cuestionario":90
        
        */
    try {
      const { Pregunta_Id, Cuestionario_Id, Pregunta_Cuestionario } = req.body;
      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      const preguntas = await preguntaRepo.findOne({
        where: { Pregunta_Id },
      });
      if (!preguntas)
        return res.status(400).json({ message: 'Pregunta inexistente' });

      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const cuestionario = await CuestionarioRepo.findOne({
        where: { Cuestionario_Id, Estado: true },
      });

      if (!cuestionario) {
        return res
          .status(400)
          .json({ message: 'El cuestionario no existente' });
      }
      let pregunta = new Pregunta();
      pregunta.Pregunta_Id = Pregunta_Id;
      pregunta.cuestionario = Cuestionario_Id;
      pregunta.Pregunta_Cuestionario = Pregunta_Cuestionario;
      const erros = await validate(preguntas, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await preguntaRepo.save(pregunta);
        return res
          .status(200)
          .json({ message: 'Pregunta actulizada correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo actualizar la pregunta' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const Pregunta_Id = parseInt(req.params['id']);
      if (!Pregunta_Id)
        return res.status(400).json({ message: 'Debe indicar el id' });
      const preguntaRepo = AppDataSource.getRepository(Pregunta);
      let preguntas: Pregunta;
      try {
        preguntas = await preguntaRepo.findOneOrFail({
          where: { Pregunta_Id, Estado: true },
        });
      } catch (error) {
        return res.status(400).json({ message: 'Pregunta no encontrada' });
      }
      preguntas.Estado = false;
      const erros = await validate(preguntas, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await preguntaRepo.save(preguntas);
        return res
          .status(200)
          .json({ message: 'Pregunta eliminada correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo eliminar la pregunta' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default PreguntaController;
