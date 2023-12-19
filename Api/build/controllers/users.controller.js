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
const user_model_1 = require("../models/user.model");
const config_1 = __importDefault(require("../config/config"));
const jwt = require('jsonwebtoken');
class UsersController {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            const userModel = new user_model_1.UserModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[signIn]';
            try {
                const { email, password } = req.params;
                const user = yield database_1.default.query('CALL stp_login(?,?)', [email, password]);
                if (user[0].length > 0) {
                    userModel.data = user[0][0];
                    const token = jwt.sign({ userId: userModel.data.user_name, email: userModel.data.email }, config_1.default.jwtCompost);
                    userModel.data.password = '';
                    responseModel.data.response = { token, userData: userModel.data };
                    res.json(responseModel);
                }
                else {
                    responseModel.data.message = 'error';
                    responseModel.data.response = { description: 'Datos Incorrectos' };
                    res.json(responseModel);
                }
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[getAll]';
            try {
                const { plantId } = req.params;
                const users = yield database_1.default.query('call stp_GC_users(?)', [plantId]);
                responseModel.data.response = users[0];
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
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[getOne]';
            res.json(responseModel);
            try {
                const { id } = req.params;
                const users = yield database_1.default.query('call stp_PC_users(?)', [id]);
                responseModel.data.response = users[0][0];
                res.json(responseModel.data);
            }
            catch (err) {
                responseModel.data.message = 'error';
                responseModel.data.response = err;
                console.log(responseModel.data.date, ' :' + responseModel.data.description, ' :' + err);
                res.status(403).json(responseModel);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[create]';
            try {
                const user = yield database_1.default.query('CALL stp_C_transport(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.date, req.body.id_plant, req.body.travel, req.body.bill, req.body.license_plate, req.body.destination, req.body.name_driver, req.body.temperature, req.body.cleaning, req.body.arrangement, req.body.coments, req.body.created_by]);
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[update]';
            try {
                const { id } = req.params;
                const user = yield database_1.default.query('CALL stp_U_users(?, ?, ?, ?, ?, ?, ?)', [id, req.body.user_name, req.body.password, req.body.name, req.body.status, req.body.id_role, req.body.modified_by]);
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
    getUserPlants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[getUserPlants]';
            try {
                const { email } = req.params;
                const plants = yield database_1.default.query('CALL stp_GC_user_plants(?)', [email]);
                responseModel.data.response = plants[0];
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
    createUserPlant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[createUserPlant]';
            try {
                const user = yield database_1.default.query('CALL stp_C_transport(?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ? )', [req.body.date, req.body.id_plant, req.body.travel, req.body.bill, req.body.license_plate, req.body.destination, req.body.name_driver, req.body.temperature, req.body.cleaning, req.body.arrangement, req.body.coments, req.body.created_by]);
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
    updateUserPlant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'User[updateUserPlant]';
            try {
                const { idUser } = req.params;
                const user = yield database_1.default.query('CALL stp_U_user_plant(?, ?, ?, ?)', [idUser, req.body.id_plant, req.body.status, req.body.created_by]);
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
}
const usersController = new UsersController();
exports.default = usersController;
