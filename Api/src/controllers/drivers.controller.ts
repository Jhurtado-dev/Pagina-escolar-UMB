import { Request, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';

const jwt = require('jsonwebtoken');

class  DriversController{

    public async getDrivers (req:Request, res:Response){
        const responseModel: ResponseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Drivers[getAll]'
        
        try{
            const plants = await pool.query('SELECT * FROM tbl_drivers;');
            responseModel.data = plants;
            res.json(responseModel)
        }catch(err){
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel.data);
        }
    }

    
}

const driversController = new DriversController();
export default driversController;