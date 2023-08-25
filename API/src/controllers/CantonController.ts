import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Canton } from '../entity/Canton';

export class CantonController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const Repo = AppDataSource.getRepository(Canton);
      const Lista = await Repo.find({
        relations: { provincia: true, distritos: true },
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
      const Canton_Id = parseInt(req.params['Canton_Id']);
      if (!Canton_Id)
        return res.status(400).json({ message: 'Debe ingresar un id' });
      const Repo = AppDataSource.getRepository(Canton);
      let canton;
      try {
        canton = await Repo.findOneOrFail({
          where: { Canton_Id: Canton_Id },
          relations: { provincia: true, distritos: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Canton no encontrado' });
      }
      return res.status(200).json(canton);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default CantonController;
