import { Request, response, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';

const jwt = require('jsonwebtoken');

class  PalletController{

    public async createPallet (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Pallet[create]'
        try {
            const user = await pool.query('CALL stp_C_pallet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
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

    public async getPallet (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Pallet[getPallet]'
        try {
            const {date} = req.params;
            const transport = await pool.query('CALL stp_GC_pallets(?)', [ date ]);
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

const palletController = new PalletController();
export default palletController;