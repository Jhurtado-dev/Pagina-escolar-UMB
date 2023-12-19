import { Request, response, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';

class  ProviderController{

    public async create (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Provider[create]'
        try {
            const provider = await pool.query('CALL stp_C_provider(?, ?, ?)', 
            [ req.body.name, req.body.status, req.body.created_by ]);
            responseModel.data.response = provider;
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }

    public async getAll (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Provider[getAll]';
        try {
            const providers = await pool.query('CALL stp_GC_providers()');
            responseModel.data.response = providers[0];
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }

    public async getOne (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Provider[getOne]';
        res.json(responseModel);
        try {
            //const {id } = req.params;
            const provider = await pool.query('CALL stp_PC_providers(?)', [ req.body.id ]);
            responseModel.data.response = provider[0][0];
            res.json(responseModel.data);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }  
    }

    public async update (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Provider[update]'
        try {
            const { id } = req.params
            const provider = await pool.query('CALL stp_U_provider(?, ?, ?, ?)',
            [ id, req.body.name, req.body.status, req.body.modified_by ]);
            responseModel.data.response = provider[0];
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }
}

const providerController = new ProviderController();
export default providerController;