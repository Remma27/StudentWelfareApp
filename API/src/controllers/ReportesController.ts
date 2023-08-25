import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Estudiante } from "../entity/Estudiante";
import { Cita } from "../entity/CIta";
import { Seguimiento } from "../entity/Seguimiento";
import { EvaluacionServicio } from "../entity/EvaluacionServicio";
import { BitacoraDocente } from "../entity/BitacoraDocente";
import { differenceInYears, parseISO } from 'date-fns';
import { validate } from "class-validator";

export class ReportesController {

    static tipoDeProblema = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoEvaluaciones = AppDataSource.getRepository(EvaluacionServicio);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find({
                select: ['Estudiante_Id', 'Telefono',
                    'Telefono2', 'Correo_Electronico']
            });
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find({
                select: [
                    'Cita_Id', 'Encargado_Nombre', 'Fecha_Cita']
            });
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find({
                select: ['Seguimiento_Id', 'Resumen_Cita',
                    'Fecha_Correspondiente', 'cita'],
                relations: ['cita']
            });
            const seguimientosCita = Seguimientos.map(seguimiento => ({
                Seguimiento_Id: seguimiento.Seguimiento_Id,
                Resumen_Cita: seguimiento.Resumen_Cita,
                Fecha_Correspondiente: seguimiento.Fecha_Correspondiente,
                Cita: {
                    Cita_Id: seguimiento.cita ? seguimiento.cita.Cita_Id : null,
                }
            }));
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Evaluaciones = await repoEvaluaciones.find({
                select: ['Evaluacion_Id', 'estudiante'],
                relations: ['estudiante'],
            });
            const evaluacionesEstudiante = Evaluaciones.map(evaluacion => ({
                Evaluacion_Id: evaluacion.Evaluacion_Id,
                Estudiante: {
                    Estudiante_Id: evaluacion.estudiante ? evaluacion.estudiante.Estudiante_Id : null,
                },
            }));
            if (Evaluaciones.length === 0) return res.status(404).json({ msg: 'No hay evaluaciones' });
            const Bitacoras = await repoBitacoras.find({
                select: ['Bitacora_Id', 'Profesor_Cedula',
                    'Profesor_Nombre', 'Observacion', 'estudiante'],
                relations: ['estudiante']
            });
            const bitacorasEstudiante = Bitacoras.map(bitacora => ({
                Bitacora_Id: bitacora.Bitacora_Id,
                Profesor_Cedula: bitacora.Profesor_Cedula,
                Profesor_Nombre: bitacora.Profesor_Nombre,
                Observacion: bitacora.Observacion,
                Estudiante: {
                    Estudiante_Id: bitacora.estudiante ? bitacora.estudiante.Estudiante_Id : null,
                }
            }));
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes,
                Citas,
                Seguimientos: seguimientosCita,
                Evaluaciones: evaluacionesEstudiante,
                Bitacoras: bitacorasEstudiante
            };
            /*const erros = await validate(reporte, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static genero = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoEvaluaciones = AppDataSource.getRepository(EvaluacionServicio);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find({
                select: ['Genero', 'Telefono',
                    'Telefono2', 'Correo_Electronico',
            /*'Foto_Cedula'*/]
            });
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find({
                select: [
                    'Cita_Id', 'Encargado_Nombre', 'Fecha_Cita']
            });
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find({
                select: ['Seguimiento_Id', 'Resumen_Cita',
                    'Fecha_Correspondiente', 'cita'],
                relations: ['cita']
            });
            const seguimientosCita = Seguimientos.map(seguimiento => ({
                Seguimiento_Id: seguimiento.Seguimiento_Id,
                Resumen_Cita: seguimiento.Resumen_Cita,
                Fecha_Correspondiente: seguimiento.Fecha_Correspondiente,
                Cita: {
                    Cita_Id: seguimiento.cita ? seguimiento.cita.Cita_Id : null,
                }
            }));
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Evaluaciones = await repoEvaluaciones.find({
                select: ['Evaluacion_Id', 'estudiante'],
                relations: ['estudiante'],
            });
            const evaluacionesEstudiante = Evaluaciones.map(evaluacion => ({
                Evaluacion_Id: evaluacion.Evaluacion_Id,
                Estudiante: {
                    Estudiante_Id: evaluacion.estudiante ? evaluacion.estudiante.Estudiante_Id : null,
                },
            }));
            if (Evaluaciones.length === 0) return res.status(404).json({ msg: 'No hay evaluaciones' });
            const Bitacoras = await repoBitacoras.find({
                select: ['Bitacora_Id', 'Profesor_Cedula',
                    'Profesor_Nombre', 'Observacion', 'estudiante'],
                relations: ['estudiante']
            });
            const bitacorasEstudiante = Bitacoras.map(bitacora => ({
                Bitacora_Id: bitacora.Bitacora_Id,
                Profesor_Cedula: bitacora.Profesor_Cedula,
                Profesor_Nombre: bitacora.Profesor_Nombre,
                Observacion: bitacora.Observacion,
                Estudiante: {
                    Estudiante_Id: bitacora.estudiante ? bitacora.estudiante.Estudiante_Id : null,
                }
            }));
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes,
                Citas,
                Seguimientos: seguimientosCita,
                Evaluaciones: evaluacionesEstudiante,
                Bitacoras: bitacorasEstudiante
            };
            /*const erros = await validate(reporte, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static edad = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoEvaluaciones = AppDataSource.getRepository(EvaluacionServicio);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find({
                select: ['Fecha_Nacimiento', 'Telefono',
                    'Telefono2', 'Correo_Electronico',
                    /*'Foto_Cedula'*/]
            });
            const estudiantesConEdad = Estudiantes.map(estudiante => {
                const edad = differenceInYears(new Date(), parseISO(estudiante.Fecha_Nacimiento.toISOString()));
                return {
                    ...estudiante,
                    Edad: edad,
                };
            });
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find({
                select: [
                    'Cita_Id', 'Encargado_Nombre', 'Fecha_Cita']
            });
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find({
                select: ['Seguimiento_Id', 'Resumen_Cita',
                    'Fecha_Correspondiente', 'cita'],
                relations: ['cita']
            });
            const seguimientosCita = Seguimientos.map(seguimiento => ({
                Seguimiento_Id: seguimiento.Seguimiento_Id,
                Resumen_Cita: seguimiento.Resumen_Cita,
                Fecha_Correspondiente: seguimiento.Fecha_Correspondiente,
                Cita: {
                    Cita_Id: seguimiento.cita ? seguimiento.cita.Cita_Id : null,
                }
            }));
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Evaluaciones = await repoEvaluaciones.find({
                select: ['Evaluacion_Id', 'estudiante'],
                relations: ['estudiante'],
            });
            const evaluacionesEstudiante = Evaluaciones.map(evaluacion => ({
                Evaluacion_Id: evaluacion.Evaluacion_Id,
                Estudiante: {
                    Estudiante_Id: evaluacion.estudiante ? evaluacion.estudiante.Estudiante_Id : null,
                },
            }));
            if (Evaluaciones.length === 0) return res.status(404).json({ msg: 'No hay evaluaciones' });
            const Bitacoras = await repoBitacoras.find({
                select: ['Bitacora_Id', 'Profesor_Cedula',
                    'Profesor_Nombre', 'Observacion', 'estudiante'],
                relations: ['estudiante']
            });
            const bitacorasEstudiante = Bitacoras.map(bitacora => ({
                Bitacora_Id: bitacora.Bitacora_Id,
                Profesor_Cedula: bitacora.Profesor_Cedula,
                Profesor_Nombre: bitacora.Profesor_Nombre,
                Observacion: bitacora.Observacion,
                Estudiante: {
                    Estudiante_Id: bitacora.estudiante ? bitacora.estudiante.Estudiante_Id : null,
                }
            }));
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes: estudiantesConEdad,
                Citas,
                Seguimientos: seguimientosCita,
                Evaluaciones: evaluacionesEstudiante,
                Bitacoras: bitacorasEstudiante
            };
            /*const erros = await validate(reporte, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static zonaProcedencia = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoEvaluaciones = AppDataSource.getRepository(EvaluacionServicio);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find({
                select: ['Distrito_Id', 'Telefono',
                    'Telefono2', 'Correo_Electronico',
                    /*'Foto_Cedula'*/]
            });
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find({
                select: [
                    'Cita_Id', 'Encargado_Nombre', 'Fecha_Cita']
            });
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find({
                select: ['Seguimiento_Id', 'Resumen_Cita',
                    'Fecha_Correspondiente', 'cita'],
                relations: ['cita']
            });
            const seguimientosCita = Seguimientos.map(seguimiento => ({
                Seguimiento_Id: seguimiento.Seguimiento_Id,
                Resumen_Cita: seguimiento.Resumen_Cita,
                Fecha_Correspondiente: seguimiento.Fecha_Correspondiente,
                Cita: {
                    Cita_Id: seguimiento.cita ? seguimiento.cita.Cita_Id : null,
                }
            }));
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Evaluaciones = await repoEvaluaciones.find({
                select: ['Evaluacion_Id', 'estudiante'],
                relations: ['estudiante'],
            });
            const evaluacionesEstudiante = Evaluaciones.map(evaluacion => ({
                Evaluacion_Id: evaluacion.Evaluacion_Id,
                Estudiante: {
                    Estudiante_Id: evaluacion.estudiante ? evaluacion.estudiante.Estudiante_Id : null,
                },
            }));
            if (Evaluaciones.length === 0) return res.status(404).json({ msg: 'No hay evaluaciones' });
            const Bitacoras = await repoBitacoras.find({
                select: ['Bitacora_Id', 'Profesor_Cedula',
                    'Profesor_Nombre', 'Observacion', 'estudiante'],
                relations: ['estudiante']
            });
            const bitacorasEstudiante = Bitacoras.map(bitacora => ({
                Bitacora_Id: bitacora.Bitacora_Id,
                Profesor_Cedula: bitacora.Profesor_Cedula,
                Profesor_Nombre: bitacora.Profesor_Nombre,
                Observacion: bitacora.Observacion,
                Estudiante: {
                    Estudiante_Id: bitacora.estudiante ? bitacora.estudiante.Estudiante_Id : null,
                }
            }));
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes,
                Citas,
                Seguimientos: seguimientosCita,
                Evaluaciones: evaluacionesEstudiante,
                Bitacoras: bitacorasEstudiante
            };
            /*const erros = await validate(reporte, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static rangoFecha = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoEvaluaciones = AppDataSource.getRepository(EvaluacionServicio);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find({
                select: [/*'Boleta_Matricula'*/, 'Telefono',
                    'Telefono2', 'Correo_Electronico',
            /*'Foto_Cedula'*/]
            });
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find({
                select: [
                    'Cita_Id', 'Encargado_Nombre', 'Fecha_Cita']
            });
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find({
                select: ['Seguimiento_Id', 'Resumen_Cita',
                    'Fecha_Correspondiente', 'cita'],
                relations: ['cita']
            });
            const seguimientosCita = Seguimientos.map(seguimiento => ({
                Seguimiento_Id: seguimiento.Seguimiento_Id,
                Resumen_Cita: seguimiento.Resumen_Cita,
                Fecha_Correspondiente: seguimiento.Fecha_Correspondiente,
                Cita: {
                    Cita_Id: seguimiento.cita ? seguimiento.cita.Cita_Id : null,
                }
            }));
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Evaluaciones = await repoEvaluaciones.find({
                select: ['Evaluacion_Id', 'estudiante'],
                relations: ['estudiante'],
            });
            const evaluacionesEstudiante = Evaluaciones.map(evaluacion => ({
                Evaluacion_Id: evaluacion.Evaluacion_Id,
                Estudiante: {
                    Estudiante_Id: evaluacion.estudiante ? evaluacion.estudiante.Estudiante_Id : null,
                },
            }));
            if (Evaluaciones.length === 0) return res.status(404).json({ msg: 'No hay evaluaciones' });
            const Bitacoras = await repoBitacoras.find({
                select: ['Bitacora_Id', 'Profesor_Cedula',
                    'Profesor_Nombre', 'Observacion', 'estudiante'],
                relations: ['estudiante']
            });
            const bitacorasEstudiante = Bitacoras.map(bitacora => ({
                Bitacora_Id: bitacora.Bitacora_Id,
                Profesor_Cedula: bitacora.Profesor_Cedula,
                Profesor_Nombre: bitacora.Profesor_Nombre,
                Observacion: bitacora.Observacion,
                Estudiante: {
                    Estudiante_Id: bitacora.estudiante ? bitacora.estudiante.Estudiante_Id : null,
                }
            }));
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes,
                Citas,
                Seguimientos: seguimientosCita,
                Evaluaciones: evaluacionesEstudiante,
                Bitacoras: bitacorasEstudiante
            };
            /*const erros = await validate(reporte, {
                validationError: { target: false, value: false },
            });
            if (erros.length > 0) {
                return res.status(400).json(erros);
            }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static recursosInvertidos = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find({
                select: ['Estudiante_Id', 'Telefono',
                    'Telefono2', 'Correo_Electronico',
                    /*'Foto_Cedula'*/]
            });
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find();
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find();
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Bitacoras = await repoBitacoras.find({
                select: ['Bitacora_Id', 'Profesor_Cedula',
                    'Profesor_Nombre', 'Observacion', 'estudiante'],
                relations: ['estudiante']
            });
            const bitacorasEstudiante = Bitacoras.map(bitacora => ({
                Bitacora_Id: bitacora.Bitacora_Id,
                Profesor_Cedula: bitacora.Profesor_Cedula,
                Profesor_Nombre: bitacora.Profesor_Nombre,
                Observacion: bitacora.Observacion,
                Estudiante: {
                    Estudiante_Id: bitacora.estudiante ? bitacora.estudiante.Estudiante_Id : null,
                }
            }));
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes,
                Citas,
                Seguimientos,
                Bitacoras: bitacorasEstudiante
            };
            /*const erros = await validate(reporte, {
               validationError: { target: false, value: false },
           });
           if (erros.length > 0) {
               return res.status(400).json(erros);
           }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    static combinacion = async (req: Request, res: Response) => {
        try {
            const repoEstudiantes = AppDataSource.getRepository(Estudiante);
            const repoCitas = AppDataSource.getRepository(Cita);
            const repoSeguimientos = AppDataSource.getRepository(Seguimiento);
            const repoEvaluaciones = AppDataSource.getRepository(EvaluacionServicio);
            const repoBitacoras = AppDataSource.getRepository(BitacoraDocente);
            const Estudiantes = await repoEstudiantes.find();
            if (Estudiantes.length === 0) return res.status(404).json({ msg: 'No hay estudiantes' });
            const Citas = await repoCitas.find();
            if (Citas.length === 0) return res.status(404).json({ msg: 'No hay citas' });
            const Seguimientos = await repoSeguimientos.find();
            if (Seguimientos.length === 0) return res.status(404).json({ msg: 'No hay seguimientos' });
            const Evaluacones = await repoEvaluaciones.find();
            if (Evaluacones.length === 0) return res.status(404).json({ msg: 'No hay evaluaciones' });
            const Bitacoras = await repoBitacoras.find();
            if (Bitacoras.length === 0) return res.status(404).json({ msg: 'No hay bitacoras' });
            const reporte = {
                Estudiantes, Citas,
                Seguimientos, Evaluacones,
                Bitacoras
            };
            /*const erros = await validate(reporte, {
               validationError: { target: false, value: false },
           });
           if (erros.length > 0) {
               return res.status(400).json(erros);
           }*/
            try {
                return res.status(200).json({ Reportes: reporte });
            } catch (error) {
                return res.status(400).json({ error: 'No se pudo obtener el reporte' });
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}