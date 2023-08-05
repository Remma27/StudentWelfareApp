import { NextFunction, Request, Response } from "express";

//aun no se ha probado y tampoco se ha 
//implementado en las rutas
const userSessions: { [userId: string]: number } = {};
export const tiempoSesion = (req: Request, res: Response, next: NextFunction) => {

    const userId = 'Usuario_Id';

    if (userSessions[userId]) {
        const currentTime = Date.now();
        const sessionDuration = 10 * 60 * 1000;

        if (currentTime - userSessions[userId] > sessionDuration) {
            delete userSessions[userId];
            return res.status(401).json('Sesión expirada, inicie sesión nuevamente');
        }
    }

    userSessions[userId] = Date.now();
    next();
}