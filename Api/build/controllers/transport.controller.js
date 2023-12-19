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
class TransportController {
    createTransport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Transport[create]';
            try {
                const user = yield database_1.default.query('CALL stp_C_transport(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.travel, req.body.bill, req.body.license_plate, req.body.destination, req.body.name_driver, req.body.temperature, req.body.cleaning, req.body.arrangement, req.body.coments, req.body.id_plant, req.body.created_by]);
                responseModel.data.response = user;
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
    getTransport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'transport[getTransport]';
            try {
                const transport = yield database_1.default.query('CALL stp_GC_transport()');
                responseModel.data.response = transport[0];
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
const usersController = new TransportController();
exports.default = usersController;
