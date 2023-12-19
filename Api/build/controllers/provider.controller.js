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
class ProviderController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Provider[create]';
            try {
                const provider = yield database_1.default.query('CALL stp_C_provider(?, ?, ?)', [req.body.name, req.body.status, req.body.created_by]);
                responseModel.data.response = provider;
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
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Provider[getAll]';
            try {
                const providers = yield database_1.default.query('CALL stp_GC_providers()');
                responseModel.data.response = providers[0];
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
            responseModel.data.description = 'Provider[getOne]';
            res.json(responseModel);
            try {
                //const {id } = req.params;
                const provider = yield database_1.default.query('CALL stp_PC_providers(?)', [req.body.id]);
                responseModel.data.response = provider[0][0];
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseModel = new response_model_1.ResponseModel();
            responseModel.data.date = new Date().toDateString();
            responseModel.data.description = 'Provider[update]';
            try {
                const { id } = req.params;
                const provider = yield database_1.default.query('CALL stp_U_provider(?, ?, ?, ?)', [id, req.body.name, req.body.status, req.body.modified_by]);
                responseModel.data.response = provider[0];
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
const providerController = new ProviderController();
exports.default = providerController;
