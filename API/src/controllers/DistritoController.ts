import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Distrito } from '../entity/Distrito';

export class DistritoController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const Repo = AppDataSource.getRepository(Distrito);
      const Lista = await Repo.find({
        relations: { provincia: true, canton: true },
      });
      if (Lista.length === 0)
        return res.status(404).json({ message: 'No hay' });
      return res.status(200).json(Lista);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Distrito_Id = parseInt(req.params['Distrito_Id']);
      if (!Distrito_Id)
        return res.status(400).json({ message: 'Debe ingresar un id' });
      const Repo = AppDataSource.getRepository(Distrito);
      let distrito;
      try {
        distrito = await Repo.findOneOrFail({
          where: { Distrito_Id },
          relations: { provincia: true, canton: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Canton no encontrado' });
      }
      return res.status(200).json(distrito);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default DistritoController;
