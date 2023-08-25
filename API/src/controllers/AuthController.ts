import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../entity/Usuario';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const { Usuario_Id, Contrasena } = req.body;
      if (!Usuario_Id || !Contrasena)
        return res
          .status(400)
          .json({ message: 'Usuario o contrasena invalidos' });
      const repoUsario = AppDataSource.getRepository(Usuario);
      let usuario: Usuario;
      try {
        usuario = await repoUsario.findOneOrFail({ where: { Usuario_Id } });
      } catch (error) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      if (!usuario.check(Contrasena))
        return res.status(400).json({ message: 'Contrasena invalida' });
      const token = jwt.sign({ id: usuario.Usuario_Id }, 'utnKey', {
        expiresIn: '15m',
      });
      return res.status(200).json({
        token,
        rol: usuario.Correo,
        id: usuario.Usuario_Id,
      });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}
export default AuthController;
