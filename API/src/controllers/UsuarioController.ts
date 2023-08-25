import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../entity/Usuario';
import { validate } from 'class-validator';
import { tiempoSesion } from '../middlewares/tiempoSesion';
import * as bcrypt from 'bcryptjs';

export class UsuarioController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const usuarioRepo = AppDataSource.getRepository(Usuario);
      const usuarios = await usuarioRepo.find({ where: { Estado: true } });
      if (usuarios.length === 0)
        return res.status(404).json({ message: 'No hay usuarios activos' });
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const Usuario_Id = parseInt(req.params['id']);
      const usuarioRepo = AppDataSource.getRepository(Usuario);
      let usuario;
      try {
        usuario = await usuarioRepo.findOneOrFail({
          where: { Usuario_Id, Estado: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ message: 'Usuario no encontrado o inactivo' });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static CompararContrasena = async (req: Request, res: Response) => {
    try {
      const { Usuario_Id, Contrasena } = req.body;
      const usuarioRepo = AppDataSource.getRepository(Usuario);
      let usuario;

      try {
        usuario = await usuarioRepo.findOneOrFail({
          where: { Usuario_Id, Estado: true },
        });

        const passwordsMatch = await bcrypt.compare(
          Contrasena,
          usuario.Contrasena
        );

        if (passwordsMatch) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(200).json({ success: false });
        }
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado o inactivo',
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Error en el servidor' });
    }
  };

  static insert = async (req: Request, resp: Response) => {
    try {
      const { Usuario_Id, Correo, Contrasena } = req.body;

      const Repo = AppDataSource.getRepository(Usuario);
      let usu = await Repo.findOne({ where: { Usuario_Id } });

      if (usu) {
        return resp
          .status(404)
          .json({ mensaje: 'Ya hay un usuario existente con esta cedula' });
      }

      usu = await Repo.findOne({ where: { Correo } });

      if (usu) {
        return resp
          .status(404)
          .json({ mensaje: 'Ya hay un usuario existente con este correo' });
      }

      let usuario = new Usuario();
      usuario.Usuario_Id = Usuario_Id;
      usuario.Correo = Correo;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Contrasena, saltRounds);

      usuario.Contrasena = hashedPassword;
      usuario.Estado = true;
      const errors = await validate(usuario, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await Repo.save(usuario);
      return resp.status(201).json({ mensaje: 'Usuario creado' });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const { Usuario_Id, Correo, Contrasena, Perfil, EstaEnSesion } = req.body;
      const usuarioRepo = AppDataSource.getRepository(Usuario);
      const usuarioExistente = await usuarioRepo.findOne({
        where: { Usuario_Id },
      });
      if (!usuarioExistente)
        return res.status(404).json({ message: 'Usuario inexistente' });
      let usuario = new Usuario();
      usuario.Usuario_Id = Usuario_Id;
      usuario.Correo = Correo;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Contrasena, saltRounds);

      usuario.Contrasena = hashedPassword;
      usuario.Estado = true;
      const erros = await validate(usuario, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await usuarioRepo.save(usuario);
        return res
          .status(200)
          .json({ message: 'Usuario actualizado correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo actualizar el usuario' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const Usuario_Id = parseInt(req.params['id']);
      if (!Usuario_Id)
        return res.status(400).json({ message: 'Debe indicar el id' });
      const usuarioRepo = AppDataSource.getRepository(Usuario);
      let usuario: Usuario;
      try {
        usuario = await usuarioRepo.findOneOrFail({
          where: { Usuario_Id, Estado: true },
        });
      } catch (error) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      usuario.Estado = false;
      const erros = await validate(usuario, {
        validationError: { target: false, value: false },
      });
      if (erros.length > 0) {
        return res.status(400).json(erros);
      }
      try {
        await usuarioRepo.save(usuario);
        return res
          .status(200)
          .json({ message: 'Usuario eliminado correctamente' });
      } catch (error) {
        return res
          .status(400)
          .json({ message: 'No se pudo eliminar el usuario' });
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default UsuarioController;
