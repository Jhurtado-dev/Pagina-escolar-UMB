import { Request, response, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';
import { UserModel } from '../models/user.model';
import config from '../config/config'

const jwt = require('jsonwebtoken');

class  UsersController{


    public async signIn (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        const userModel = new UserModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'User[signIn]';
        try {
            const {email , password} = req.params;
            const user = await pool.query('CALL stp_login(?,?)', [ email, password]);
            if(user[0].length > 0){
                userModel.data = user[0][0];
                const token = jwt.sign({userId: userModel.data.user_name, email: userModel.data.email }, config.jwtCompost)
                userModel.data.password = '';
                responseModel.data.response = {token, userData: userModel.data}
                res.json(responseModel);
            } else {
                responseModel.data.message = 'error'
                responseModel.data.response = {description: 'Datos Incorrectos'}
                res.json(responseModel);
            }
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
        responseModel.data.description = 'User[getAll]';
        try {
            const {plantId} = req.params;
            const users = await pool.query('call stp_GC_users(?)',[ plantId ]);
            responseModel.data.response = users[0];
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
        responseModel.data.description = 'User[getOne]';
        res.json(responseModel);
        try {
            const {id } = req.params;
            const users = await pool.query('call stp_PC_users(?)',[ id ]);
            responseModel.data.response = users[0][0];
            res.json(responseModel.data);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
        
    }

    public async create (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'User[create]'
        try {
            const user = await pool.query('CALL stp_C_transport(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [ req.body.date, req.body.id_plant, req.body.travel, req.body.bill, req.body.license_plate, req.body.destination, req.body.name_driver, req.body.temperature, req.body.cleaning, req.body.arrangement, req.body.coments, req.body.created_by]);
            responseModel.data.response = user;
            res.json(responseModel);
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
        responseModel.data.description = 'User[update]'
        try {
            const { id } = req.params
            const user = await pool.query('CALL stp_U_users(?, ?, ?, ?, ?, ?, ?)', 
            [ id, req.body.user_name, req.body.password, req.body.name, req.body.status, req.body.id_role, req.body.modified_by ]);
            responseModel.data.response = user;
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
        
    }

    public async getUserPlants (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'User[getUserPlants]'
        try {
            const {email} = req.params;
            const plants = await pool.query('CALL stp_GC_user_plants(?)', [ email ]);
            responseModel.data.response = plants[0];
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }

    public async createUserPlant (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'User[createUserPlant]'
        try {
            const user = await pool.query('CALL stp_C_transport(?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ? )', 
            [ req.body.date, req.body.id_plant, req.body.travel, req.body.bill, req.body.license_plate, req.body.destination, req.body.name_driver, req.body.temperature, req.body.cleaning, req.body.arrangement, req.body.coments, req.body.created_by]);
            responseModel.data.response = user;
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
    }

    public async updateUserPlant (req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'User[updateUserPlant]'
        try {
            const { idUser } = req.params
            const user = await pool.query('CALL stp_U_user_plant(?, ?, ?, ?)', 
            [ idUser, req.body.id_plant, req.body.status, req.body.created_by ]);
            responseModel.data.response = user;
            res.json(responseModel);
        } catch(err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err );
            res.status(403).json(responseModel);
        }
        
    }
}

const usersController = new UsersController();
export default usersController;