import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { validate } from "class-validator";


export class UsuarioController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            const usuarios = await usuarioRepo.find({ where: { Estado: true } });
            if (usuarios.length === 0) return res.status(404).json({ message: 'No hay usuarios activos' });
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const Usuario_Id = parseInt(req.params['id']);
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            let usuario;
            try {
                usuario = await usuarioRepo.findOneOrFail({ where: { Usuario_Id, Estado: true } });
            } catch (error) {
                return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static insert = async (req: Request, res: Response) => {

        /*formato

        "Usuario_Id":1,
        "Usuario":"Daniela",
        "Contrasena":"blablaplayos123",
        "Perfil":"Estudiante"
        */
        try {
            const { Usuario_Id, Usuario, Contrasena, Perfil } = req.body;
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            const usuarioExistente = await usuarioRepo.findOne({ where: { Usuario_Id, Estado: true } });
            if (usuarioExistente) return res.status(400).json({ message: 'Usuario existente' });
            let usuarios = new Usuario();
            usuarios.Usuario_Id = Usuario_Id;
            usuarios.Usuario = Usuario;
            usuarios.Contrasena = Contrasena;
            usuarios.Perfil = Perfil;
            usuarios.Estado = true;
            const erros = await validate(usuarios, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await usuarioRepo.save(usuarios);
                return res.status(201).json({ message: 'Usuario insertado correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo insertar el usuario' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {

        /*formato

        "Usuario_Id":1,
        "Usuario":"Daniela",
        "Contrasena":"blablaplayos123",
        "Perfil":"Estudiante"
        */
        try {
            const { Usuario_Id, Usuario, Contrasena, Perfil } = req.body;
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            const usuarioExistente = await usuarioRepo.findOne({ where: { Usuario_Id } });
            if (!usuarioExistente) return res.status(404).json({ message: 'Usuario inexistente' });
            let usuarios = new Usuario();
            usuarios.Usuario_Id = Usuario_Id;
            usuarios.Usuario = Usuario;
            usuarios.Contrasena = Contrasena;
            usuarios.Perfil = Perfil;
            usuarios.Estado = true;
            const erros = await validate(usuarios, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await usuarioRepo.save(usuarios);
                return res.status(200).json({ message: 'Usuario actualizado correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo actualizar el usuario' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const Usuario_Id = parseInt(req.params['id']);
            if (!Usuario_Id) return res.status(400).json({ message: 'Debe indicar el id' });
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            let usuario: Usuario;
            try {
                usuario = await usuarioRepo.findOneOrFail({ where: { Usuario_Id, Estado: true } });
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
                return res.status(200).json({ message: 'Usuario eliminado correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo eliminar el usuario' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export default UsuarioController;