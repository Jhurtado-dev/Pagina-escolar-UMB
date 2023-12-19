"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
const data_Base_model_1 = require("./data_Base.model");
class ResponseModel extends data_Base_model_1.DataBaseModel {
    constructor(id = '', data) {
        super(id, data);
        if (data) {
            this.data = data;
        }
        else {
            this.data = {
                date: '',
                message: 'ok',
                description: '',
                response: ''
            };
        }
    }
}
exports.ResponseModel = ResponseModel;
