import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cuestionario } from "../entity/Cuestionario";
import { validate } from "class-validator";

export class CuestionarioController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const cuestionario = await CuestionarioRepo.find({
        where: { Estado: true },
      });
      if (cuestionario.length === 0)
        return res
          .status(404)
          .json({ message: "No hay informacion de cuestionarios" });
      return res.status(200).json(cuestionario);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Cuestionario_Id = parseInt(req.params["id"]);
      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      let cuestionario;
      try {
        cuestionario = await CuestionarioRepo.findOneOrFail({
          where: { Cuestionario_Id, Estado: true },
        });
      } catch (error) {
        return res.status(404).json({ message: "Informacion no encontrada" });
      }
      return res.status(200).json(cuestionario);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static insert = async (req: Request, res: Response) => {
    /*formato
        
                "Cuestionario_Id": 3,
                "Nombre_Cuestionario": 'Como hacer amiguitos en la U'
        
                */
    try {
      const { Cuestionario_Id, Nombre_Cuestionario, Estado } = req.body;

      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const CuestionarioExistente = await CuestionarioRepo.findOne({
        where: { Cuestionario_Id, Estado: true },
      });
      if (CuestionarioExistente)
        return res
          .status(400)
          .json({ message: "Ya existe informacion de cuestionario" });
      let cuestionario = new Cuestionario();

      cuestionario.Cuestionario_Id = Cuestionario_Id;
      cuestionario.Nombre_Cuestionario = Nombre_Cuestionario;
      cuestionario.Estado = true;

      const erros = await validate(cuestionario, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await CuestionarioRepo.save(cuestionario);
        return res.status(201).json({
          message:
            "La informacion de cuestionario ha sido insertada correctamente",
        });
      } catch (error) {
        return res.status(400).json({
          message:
            "La informacion de cuestionario no ha podido ser insertada correctamente",
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    /*formato
        
                "Cuestionario_Id": 3,
                "Nombre_Cuestionario": 'Experiencias sobrenaturales de la UTN'
        
                */
    try {
      const { Cuestionario_Id, Nombre_Cuestionario, Estado } = req.body;

      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      const CuestionarioExistente = await CuestionarioRepo.findOne({
        where: { Cuestionario_Id },
      });
      if (!CuestionarioExistente)
        return res
          .status(400)
          .json({ message: "No existe informacion de cuestionario" });
      let cuestionario = new Cuestionario();

      cuestionario.Cuestionario_Id = Cuestionario_Id;
      cuestionario.Nombre_Cuestionario = Nombre_Cuestionario;
      cuestionario.Estado = true;

      const erros = await validate(cuestionario, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await CuestionarioRepo.save(cuestionario);
        return res.status(201).json({
          message:
            "La informacion de cuestionario ha sido insertada correctamente",
        });
      } catch (error) {
        return res.status(400).json({
          message:
            "La informacion de cuestionario no ha podido ser insertada correctamente",
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const Cuestionario_Id = parseInt(req.params["id"]);
      if (!Cuestionario_Id)
        return res.status(400).json({ message: "Debe indicar el id" });
      const CuestionarioRepo = AppDataSource.getRepository(Cuestionario);
      let cuesti: Cuestionario;
      try {
        cuesti = await CuestionarioRepo.findOneOrFail({
          where: { Cuestionario_Id, Estado: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ message: "Informacion de cuestionario no encontrada" });
      }
      cuesti.Estado = false;
      const erros = await validate(cuesti, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await CuestionarioRepo.save(cuesti);
        return res.status(200).json({
          message: "Informacion de cuestionario eliminada correctamente",
        });
      } catch (error) {
        return res.status(400).json({
          message: "No se ha podido eliminar la informacion de cuestionario",
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default CuestionarioController;
