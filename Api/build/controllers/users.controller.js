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
                const { email, password } = req.query;
                // Ejecutar el procedimiento almacenado
                const result = yield database_1.default.query `EXEC UserLogin @pemail = ${email}, @ppassword = ${password}`;
                const user = result.recordset[0];
                if (user) {
                    userModel.data = user;
                    const token = jwt.sign({ userId: userModel.data.user_name }, config_1.default.jwtCompost);
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
}
const usersController = new UsersController();
exports.default = usersController;
