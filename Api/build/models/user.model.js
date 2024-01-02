"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const data_base_model_1 = require("./data_base.model");
class UserModel extends data_base_model_1.DataBaseModel {
    constructor(id = '', data) {
        super(id, data);
        if (data) {
            this.data = data;
        }
        else {
            this.data = {
                user_name: '',
                id_role: 0,
                role_name: '',
            };
        }
    }
}
exports.UserModel = UserModel;
