"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const data_Base_model_1 = require("./data_Base.model");
class UserModel extends data_Base_model_1.DataBaseModel {
    constructor(id = '', data) {
        super(id, data);
        if (data) {
            this.data = data;
        }
        else {
            this.data = {
                name: '',
                email: '',
                user_name: '',
                password: '',
                id_role: 0,
                role: '',
                created_by: '',
                modified_by: ''
            };
        }
    }
}
exports.UserModel = UserModel;
