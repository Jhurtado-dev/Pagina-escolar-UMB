"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const response_model_1 = require("../models/response.model");
const jwt = require('jsonwebtoken');
class ShipmentController {
    getPlants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Plants[getAll]';
            try {
                const plants = yield database_1.default.query('SELECT * FROM tbl_plants;');
                responseModel.data = plants;
                res.json(responseModel);
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel.data);
            }
        });
    }
    getSku(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Sku[getAll]';
            try {
                const plants = yield database_1.default.query('SELECT * FROM tbl_sku;');
                responseModel.data = plants;
                res.json(responseModel);
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel.data);
            }
        });
    }
    getBoxes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Boxes[getAll]';
            try {
                const plants = yield database_1.default.query('SELECT * FROM tbl_boxes;');
                responseModel.data = plants;
                res.json(responseModel);
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel.data);
            }
        });
    }
    getPallets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Pallets[getAll]';
            try {
                const plants = yield database_1.default.query('SELECT * FROM tbl_pallet_description;');
                responseModel.data = plants;
                res.json(responseModel);
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel.data);
            }
        });
    }
    createPallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Pallet[create]';
            try {
                const { date_cut, plant, no_p_plant, quality_plant, quality_nce, descalification, boxes_plant, boxes_nce, dif_boxes, net_weight_plant, net_weight_nce, dif_net_weight, tara, total_weight_nce, unit, temperature, fleje, coments, n_a, code, tara_boxes, id_box_plant, id_box_nce, id_type_pallet, id_transport, created_by } = req.body;
                const pallet = yield database_1.default.query('CALL stp_C_pallets(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [date_cut, plant, no_p_plant, quality_plant, quality_nce, descalification, boxes_plant, boxes_nce, dif_boxes, net_weight_plant, net_weight_nce, dif_net_weight, tara, total_weight_nce, unit, temperature, fleje, coments, n_a, code, tara_boxes, id_box_plant, id_box_nce, id_type_pallet, id_transport, created_by]);
                responseModel.data.response = pallet;
                res.json(responseModel);
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel);
            }
        });
    }
}
const shipmentController = new ShipmentController();
exports.default = shipmentController;
