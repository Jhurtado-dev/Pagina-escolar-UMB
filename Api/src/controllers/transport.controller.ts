import { Request, response, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';
import { UserModel } from '../models/user.model';
import config from '../config/config'

const jwt = require('jsonwebtoken');

class  TransportController{

    public async createTransport (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Transport[create]'
        try {
            const user = await pool.query('CALL stp_C_transport(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [ req.body.travel, req.body.bill, req.body.license_plate, req.body.destination, req.body.name_driver, req.body.temperature, req.body.cleaning, req.body.arrangement, req.body.coments, req.body.id_plant, req.body.created_by]);
            responseModel.data.response = user;
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }

    public async getTransport (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'transport[getTransport]'
        try {
            const transport = await pool.query('CALL stp_GC_transport()');
            responseModel.data.response = transport[0];
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }

   
}

const usersController = new TransportController();
export default usersController;