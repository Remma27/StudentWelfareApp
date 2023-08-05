import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { RespuestaDocumento } from "../entity/RespuestaDocumento";
import { validate } from "class-validator";

export class RespuestaDocumentoController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const resDocumentRepo = AppDataSource.getRepository(RespuestaDocumento);
            const resDocumentos = await resDocumentRepo.find({
                where: { Estado: true },
                relations: { pregunta: true, evaluacionServicio: true, cuestionario: true }
            });
            if (resDocumentos.length === 0) return res.status(404).json({ message: 'No hay respuestas activas' });
            return res.status(200).json(resDocumentos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const Respuesta_Id_Documento = parseInt(req.params['id']);
            const resDocumentRepo = AppDataSource.getRepository(RespuestaDocumento);
            let resDocumentos;
            try {
                resDocumentos = await resDocumentRepo.findOneOrFail({
                    where: { Respuesta_Id_Documento, Estado: true },
                    relations: { pregunta: true, evaluacionServicio: true, cuestionario: true }
                });
            } catch (error) {
                return res.status(400).json({ error: 'Respuesta de documento inexistente' });
            }
            return res.status(200).json(resDocumentos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static insert = async (req: Request, res: Response) => {

        /*formato

    "Respuesta_Id_Documento":1,
    "Pregunta_Id":1,
    "Evaluacion_Id":1,
    "Cuestionario_Id":1,
    "Respuesta_Documento":"Enfermo"

    */

        try {
            const { Respuesta_Id_Documento, Pregunta_Id,
                Evaluacion_Id, Cuestionario_Id,
                Respuesta_Documento } = req.body;
            const resDocumentRepo = AppDataSource.getRepository(RespuestaDocumento);
            const resDocumentos = await resDocumentRepo.findOne({
                where: { Estado: true },
                relations: { pregunta: true, evaluacionServicio: true, cuestionario: true }
            });
            if (resDocumentos) return res.status(400).json({ message: 'Respuesta de documento existente' });
            let resDocumento = new RespuestaDocumento();
            resDocumento.Respuesta_Id_Documento = Respuesta_Id_Documento;
            resDocumento.pregunta = Pregunta_Id;
            resDocumento.evaluacionServicio = Evaluacion_Id;
            resDocumento.cuestionario = Cuestionario_Id;
            resDocumento.Respuesta_Documento = Respuesta_Documento;
            resDocumento.Estado = true;
            const erros = await validate(resDocumento, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await resDocumentRepo.save(resDocumento);
                return res.status(201).json({ message: 'Respuesta de documento insertada correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'Error al insertar la respuesta de documento' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static update = async (req: Request, res: Response) => {
        /*formato

    "Respuesta_Id_Documento":1,
    "Pregunta_Id":1,
    "Evaluacion_Id":1,
    "Cuestionario_Id":1,
    "Respuesta_Documento":"Enfermo"

    */

        try {
            const { Respuesta_Id_Documento, Pregunta_Id,
                Evaluacion_Id, Cuestionario_Id,
                Respuesta_Documento } = req.body;
            const resDocumentRepo = AppDataSource.getRepository(RespuestaDocumento);
            const resDocumentos = await resDocumentRepo.findOne({
                where: { Respuesta_Id_Documento },
                relations: { pregunta: true, evaluacionServicio: true, cuestionario: true }
            });
            if (!resDocumentos) return res.status(400).json({ message: 'Respuesta de documento inexistente' });
            let resDocumento = new RespuestaDocumento();
            resDocumento.Respuesta_Id_Documento = Respuesta_Id_Documento;
            resDocumento.pregunta = Pregunta_Id;
            resDocumento.evaluacionServicio = Evaluacion_Id;
            resDocumento.cuestionario = Cuestionario_Id;
            resDocumento.Respuesta_Documento = Respuesta_Documento;
            resDocumento.Estado = true;
            const erros = await validate(resDocumento, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await resDocumentRepo.save(resDocumento);
                return res.status(200).json({ message: 'Respuesta de documento actualizada correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'Error al actualizar la respuesta de documento' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const Respuesta_Id_Documento = parseInt(req.params['id']);
            const resDocumentRepo = AppDataSource.getRepository(RespuestaDocumento);
            let resDocumentos: RespuestaDocumento;
            try {
                resDocumentos = await resDocumentRepo.findOneOrFail({
                    where: {
                        Respuesta_Id_Documento,
                        Estado: true
                    },
                    relations: { pregunta: true, evaluacionServicio: true, cuestionario: true }
                });
            } catch (error) {
                return res.status(400).json({ error: 'Respuesta de documento inexistente' });
            }
            resDocumentos.Estado = false;
            const erros = await validate(resDocumentos, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }
            try {
                await resDocumentRepo.save(resDocumentos);
                return res.status(200).json({ message: 'Respuesta de documento eliminada correctamente' });
            } catch (error) {
                return res.status(400).json({ message: 'Error al eliminar la respuesta de documento' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export default RespuestaDocumentoController;