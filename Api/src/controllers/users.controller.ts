import { Request, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';
import { UserModel } from '../models/user.model';
import config from '../config/config';
import { StudentInfoModel } from '../models/studentInfo.model';

const jwt = require('jsonwebtoken');

class UsersController {
    public async signIn(req: Request, res: Response): Promise<void> {
            const responseModel = new ResponseModel();
        const userModel = new UserModel();
        const studentInfoModel = new StudentInfoModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'User[signIn]';

        try {
        const { email, password } = req.query;
        // Ejecutar el procedimiento almacenado
        const result = await pool.query`EXEC UserLogin @pemail = ${email}, @ppassword = ${password}`;
        const user = result.recordset[0];
        if (user) {
            userModel.data = user;
            const token = jwt.sign({ userId: userModel.data.user_name, userRole: userModel.data.role_name }, config.jwtCompost);
            responseModel.data.response = { token, userData: userModel.data };
            res.json(responseModel);
        } else {
            responseModel.data.message = 'error';
            responseModel.data.response = { description: 'Datos Incorrectos' };
            res.json(responseModel);
        }
        } catch (err) {
        responseModel.data.message = 'error';
        responseModel.data.response = err;
        console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
        res.status(403).json(responseModel);
        }
    }

    public async studentInfo(req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
    const studentInfoModel = new StudentInfoModel();
    responseModel.data.date = new Date().toDateString();
    responseModel.data.description = 'User[studentInfo]';

    try {
    const { userId } = req.query;
    // Ejecutar el procedimiento almacenado
    const result = await pool.query`EXEC GetStudentGrades @userID = ${userId}`;
    const user:any=[] = result.recordset;
    if (user) {
        studentInfoModel.data = user;
        responseModel.data.response = { userData: studentInfoModel.data };
        res.json(responseModel);
    } else {
        responseModel.data.message = 'error';
        responseModel.data.response = { description: 'Usuario no encontrado' };
        res.json(responseModel);
    }
    } catch (err) {
    responseModel.data.message = 'error';
    responseModel.data.response = err;
    console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
    res.status(403).json(responseModel);
    }
}

public async studentSchedule(req: Request, res: Response): Promise<void> {
    const responseModel = new ResponseModel();
const studentInfoModel = new StudentInfoModel();
responseModel.data.date = new Date().toDateString();
responseModel.data.description = 'User[studentSchedule]';

try {
const { userId } = req.query;
// Ejecutar el procedimiento almacenado
const result = await pool.query`EXEC GetSchedule @userID = ${userId}`;
const user:any=[] = result.recordset;
if (user) {
    studentInfoModel.data = user;
    responseModel.data.response = { userData: studentInfoModel.data };
    res.json(responseModel);
} else {
    responseModel.data.message = 'error';
    responseModel.data.response = { description: 'Usuario no encontrado' };
    res.json(responseModel);
}
} catch (err) {
responseModel.data.message = 'error';
responseModel.data.response = err;
console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
res.status(403).json(responseModel);
}
}

}

const usersController = new UsersController();
export default usersController;
