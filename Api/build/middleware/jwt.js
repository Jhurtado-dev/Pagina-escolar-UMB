"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const config_1 = __importDefault(require("../config/config"));
const jwt = require('jsonwebtoken');
const checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtCompost);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, config_1.default.jwtCompost);
    res.setHeader('token', newToken);
    next();
};
exports.checkJwt = checkJwt;
