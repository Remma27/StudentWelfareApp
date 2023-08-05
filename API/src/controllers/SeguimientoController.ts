import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Seguimiento } from "../entity/Seguimiento";
import { validate } from "class-validator";


export class SeguimientoController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const seguimientoRepo = AppDataSource.getRepository(Seguimiento);
            const seguimientos = await seguimientoRepo.find({
                where:
                    { Estado: true }, relations: { cita: true }
            });
            if (seguimientos.length === 0) return res.status(404).json({ message: 'No hay seguimientos activos' });
            return res.status(200).json(seguimientos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const Seguimiento_Id = parseInt(req.params['id']);
            const seguimientoRepo = AppDataSource.getRepository(Seguimiento);
            let seguimiento;
            try {
                seguimiento = await seguimientoRepo.findOneOrFail({
                    where:
                        { Seguimiento_Id, Estado: true }, relations: { cita: true }
                });
            } catch (error) {
                return res.status(404).json({ message: 'Seguimiento no encontrado o inactivo' });
            }
            return res.status(200).json(seguimiento);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static insert = async (req: Request, res: Response) => {

        /*formato

        "Seguimiento_Id":1,
        "Cita_Id":1,
        "Agenda_Cita":"Diciembre 2026",
        "Resumen_Cita":"Esta enfermo de la mente",
        "Fecha_Correspondiente":"2026-12-12"
        */
        try {
            const { Seguimiento_Id, Cita_Id, Agenda_Cita,
                Resumen_Cita, Fecha_Correspondiente } = req.body;
            const seguimientoRepo = AppDataSource.getRepository(Seguimiento);
            const seguimientoExistente = await seguimientoRepo.findOne({
                where:
                    { Seguimiento_Id, Estado: true }, relations: { cita: true }
            });
            if (seguimientoExistente) return res.status(400).json({ message: 'Seguimiento existente' });
            let seguimiento = new Seguimiento();
            seguimiento.Seguimiento_Id = Seguimiento_Id;
            seguimiento.cita = Cita_Id;
            seguimiento.Agenda_Cita = Agenda_Cita;
            seguimiento.Resumen_Cita = Resumen_Cita;
            seguimiento.Fecha_Correspondiente = Fecha_Correspondiente;
            seguimiento.Estado = true;
            const erros = await validate(seguimiento, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await seguimientoRepo.save(seguimiento);
                return res.status(201).json({ message: 'Seguimiento insertado correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo insertar el seguimiento' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        try {
            const { Seguimiento_Id, Cita_Id, Agenda_Cita,
                Resumen_Cita, Fecha_Correspondiente } = req.body;
            const seguimientoRepo = AppDataSource.getRepository(Seguimiento);
            const seguimientoExistente = await seguimientoRepo.findOne({
                where: { Seguimiento_Id, Estado: true }, relations: { cita: true }
            });
            if (!seguimientoExistente) return res.status(400).json({ message: 'Seguimiento inexistente' });
            let seguimiento = new Seguimiento();
            seguimiento.Seguimiento_Id = Seguimiento_Id;
            seguimiento.cita = Cita_Id;
            seguimiento.Agenda_Cita = Agenda_Cita;
            seguimiento.Resumen_Cita = Resumen_Cita;
            seguimiento.Fecha_Correspondiente = Fecha_Correspondiente;
            seguimiento.Estado = true;
            const erros = await validate(seguimiento, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await seguimientoRepo.save(seguimiento);
                return res.status(200).json({ message: 'Seguimiento actualizado correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo actualizar el seguimiento' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const Seguimiento_Id = parseInt(req.params['id']);
            if (!Seguimiento_Id) return res.status(400).json({ message: 'Debe ingresar un id' });
            const seguimientoRepo = AppDataSource.getRepository(Seguimiento);
            let seguimiento: Seguimiento;
            try {
                seguimiento = await seguimientoRepo.findOneOrFail({ where: { Seguimiento_Id, Estado: true } });
            } catch (error) {
                return res.status(400).json({ message: 'Seguimiento no encontrado' });
            }
            seguimiento.Estado = false;
            const erros = await validate(seguimiento, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await seguimientoRepo.save(seguimiento);
                return res.status(200).json({ message: 'Seguimiento eliminado correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'No se pudo eliminar el seguimiento' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export default SeguimientoController;