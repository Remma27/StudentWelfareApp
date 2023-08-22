import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Provincia } from '../entity/Provincia';

export class ProvinciaController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const Repo = AppDataSource.getRepository(Provincia);
      const Lista = await Repo.find({
        relations: { cantones: true, distritos: true },
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
      const Provincia_Id = parseInt(req.params['Provincia_Id']);
      if (!Provincia_Id)
        return res.status(400).json({ message: 'Debe ingresar un id' });
      const Repo = AppDataSource.getRepository(Provincia);
      let provincia;
      try {
        provincia = await Repo.findOneOrFail({
          where: { Provincia_Id: Provincia_Id },
          relations: { cantones: true, distritos: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Provincia no encontrada' });
      }
      return res.status(200).json(provincia);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default ProvinciaController;
