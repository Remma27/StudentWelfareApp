import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { BitacoraDocente } from "../entity/BitacoraDocente";
import { validate } from "class-validator";
import { Estudiante } from "../entity/Estudiante";


export class BitacoraDocenteController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const bitacorasRepo = AppDataSource.getRepository(BitacoraDocente);
            const bitacoras = await bitacorasRepo.find({
                where: { Estado: true },
                relations: { estudiante: true }
            });
            if (bitacoras.length === 0) return res.status(404).json({ message: 'No hay bitacoras activas' });
            return res.status(200).json(bitacoras);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const Bitacora_Id = parseInt(req.params['id']);
            const bitacorasRepo = AppDataSource.getRepository(BitacoraDocente);
            let bitacora;
            try {
                bitacora = await bitacorasRepo.findOneOrFail({
                    where: { Bitacora_Id, Estado: true },
                    relations: { estudiante: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Bitacora no encontrada o inactiva' });
            }
            return res.status(200).json(bitacora);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static insert = async (req: Request, res: Response) => {
        try {
            const { Bitacora_Id, Estudiante_Id,
                Profesor_Cedula, Profesor_Nombre,
                Nombre_Curso, Observacion } = req.body;


            const estudianteRepo = AppDataSource.getRepository(Estudiante);

            // Verificar si el estudiante existe
            const estudianteExistente = await estudianteRepo.findOne({ where: { Estudiante_Id } });

            if (!estudianteExistente) {
                return res.status(404).json({ message: 'El estudiante no existe' });
            }

            const bitacorasRepo = AppDataSource.getRepository(BitacoraDocente);
            const bitacoraExistente = await bitacorasRepo.findOne({
                where: { Bitacora_Id, Estado: true },
                relations: { estudiante: true }
            });


            if (bitacoraExistente) return res.status(400).json({ message: 'Bitacora existente' });
            let bitacora = new BitacoraDocente();
            let fecha = new Date();
            bitacora.Bitacora_Id = Bitacora_Id;
            bitacora.estudiante = Estudiante_Id;
            bitacora.Profesor_Cedula = Profesor_Cedula;
            bitacora.Profesor_Nombre = Profesor_Nombre;
            bitacora.Nombre_Curso = Nombre_Curso;
            bitacora.Fecha = fecha;
            bitacora.Observacion = Observacion;
            bitacora.Estado = true;
            const errores = await validate(bitacora, {
                validationError: { target: false, value: false },
            });
            if (errores.length > 0) {
                return res.status(400).json(errores);
            }
            try {
                await bitacorasRepo.save(bitacora);
                return res.status(201).json({ message: 'Bitacora insertada correctamete' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo insertar la bitacora' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {

        /*formato 
            "Bitacora_Id":1,
            "Estudiante_Id":1,
            "Profesor_Cedula":7271819,
            "Profesor_Nombre":"Juan Carlos",
            "Nombre_Curso":"Gastronomia 1",
            "Observacion":"Se encuentra como loco legalmente"
        */
        try {
            const { Bitacora_Id, Estudiante_Id,
                Profesor_Cedula, Profesor_Nombre,
                Nombre_Curso, Observacion } = req.body;
            const bitacorasRepo = AppDataSource.getRepository(BitacoraDocente);
            const bitacoraExistente = await bitacorasRepo.findOne({
                where: { Bitacora_Id }, relations: { estudiante: true }
            });
            if (!bitacoraExistente) return res.status(404).json({ message: 'Bitacora inexistente' });
            let bitacora = new BitacoraDocente();
            let fecha = new Date();
            bitacora.Bitacora_Id = Bitacora_Id;
            bitacora.estudiante = Estudiante_Id;
            bitacora.Profesor_Cedula = Profesor_Cedula;
            bitacora.Profesor_Nombre = Profesor_Nombre;
            bitacora.Nombre_Curso = Nombre_Curso;
            bitacora.Fecha = fecha;
            bitacora.Observacion = Observacion;
            bitacora.Estado = true;
            const errores = await validate(bitacora, {
                validationError: { target: false, value: false },
            });
            if (errores.length > 0) {
                return res.status(400).json(errores);
            }
            try {
                await bitacorasRepo.save(bitacora);
                return res.status(200).json({ message: 'Bitacora actualizada correctamete' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo actualizar la bitacora' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const Bitacora_Id = parseInt(req.params['id']);
            if (!Bitacora_Id) return res.status(400).json({ message: 'Debe ingresar un id' });
            const bitacorasRepo = AppDataSource.getRepository(BitacoraDocente);
            let bitacora: BitacoraDocente;
            try {
                bitacora = await bitacorasRepo.findOneOrFail({
                    where: { Bitacora_Id, Estado: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Bitacora no encontrada' });
            }
            bitacora.Estado = false;
            const errores = await validate(bitacora, {
                validationError: { target: false, value: false },
            });
            if (errores.length > 0) {
                return res.status(400).json(errores);
            }
            try {
                await bitacorasRepo.save(bitacora);
                return res.status(200).json({ message: 'Bitacora eliminada correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo eliminar la bitacora' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export default BitacoraDocenteController;