import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const checkjwt = (req: Request, res: Response, next: NextFunction) => {

    const token = <string>req.header['token'];
    if (!token) return res.status(403).json({ message: 'Acceso no permitido' });
    let payload;
    try {
        payload = jwt.verify(token, 'utnKey');
        res.locals.payload = payload;
    } catch (error) {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    const { id } = payload;
    const nuevoToken = jwt.sign({ id }, 'utnKey', { expiresIn: '15m' });
    res.setHeader('token', nuevoToken);

    next();
}