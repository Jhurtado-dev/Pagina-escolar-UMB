import { Request, Response } from 'express';
import pool from '../database';
import { ResponseModel } from '../models/response.model';

const jwt = require('jsonwebtoken');

class ShipmentController {

    public async getPlants(req: Request, res: Response) {
        const responseModel: ResponseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Plants[getAll]'

        try {
            const plants = await pool.query('SELECT * FROM tbl_plants;');
            responseModel.data = plants;
            res.json(responseModel)
        } catch (err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
            res.status(403).json(responseModel.data);
        }
    }

    public async getSku(req: Request, res: Response) {
        const responseModel: ResponseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Sku[getAll]'

        try {
            const plants = await pool.query('SELECT * FROM tbl_sku;');
            responseModel.data = plants;
            res.json(responseModel)
        } catch (err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
            res.status(403).json(responseModel.data);
        }
    }
    public async getBoxes(req: Request, res: Response) {
        const responseModel: ResponseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Boxes[getAll]'

        try {
            const plants = await pool.query('SELECT * FROM tbl_boxes;');
            responseModel.data = plants;
            res.json(responseModel)
        } catch (err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
            res.status(403).json(responseModel.data);
        }
    }
    public async getPallets(req: Request, res: Response) {
        const responseModel: ResponseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Pallets[getAll]'

        try {
            const plants = await pool.query('SELECT * FROM tbl_pallet_description;');
            responseModel.data = plants;
            res.json(responseModel)
        } catch (err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
            res.status(403).json(responseModel.data);
        }
    }
    public async createPallet(req: Request, res: Response): Promise<void> {
        const responseModel = new ResponseModel();
        responseModel.data.date = new Date().toDateString();
        responseModel.data.description = 'Pallet[create]'
        try {
            const { date_cut, plant, no_p_plant, quality_plant, quality_nce, descalification, boxes_plant, boxes_nce, dif_boxes, net_weight_plant, net_weight_nce, dif_net_weight, tara, total_weight_nce, unit, temperature, fleje, coments, n_a, code, tara_boxes, id_box_plant, id_box_nce, id_type_pallet, id_transport, created_by } = req.body
            const pallet = await pool.query('CALL stp_C_pallets(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [date_cut, plant, no_p_plant, quality_plant, quality_nce, descalification, boxes_plant, boxes_nce, dif_boxes, net_weight_plant, net_weight_nce, dif_net_weight, tara, total_weight_nce, unit, temperature, fleje, coments, n_a, code, tara_boxes, id_box_plant, id_box_nce, id_type_pallet, id_transport, created_by]);
            responseModel.data.response = pallet;
            res.json(responseModel);
        } catch (err) {
            responseModel.data.message = 'error'
            responseModel.data.response = err
            console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
            res.status(403).json(responseModel);
        }
    }
}



const shipmentController = new ShipmentController();
export default shipmentController;