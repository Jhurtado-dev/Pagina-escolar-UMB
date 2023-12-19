import { Request, Response, NextFunction } from 'express'
import config from '../config/config'
const jwt = require('jsonwebtoken');

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtCompost);
        res.locals.jwtPayload = jwtPayload;
    } catch (err) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const {userId, email} = jwtPayload;

    const newToken = jwt.sign({userId, email}, config.jwtCompost);

    res.setHeader('token', newToken);
    next();
}