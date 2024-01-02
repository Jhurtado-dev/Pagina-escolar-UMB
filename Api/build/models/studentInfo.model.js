"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentInfoModel = void 0;
const data_base_model_1 = require("./data_base.model");
class StudentInfoModel extends data_base_model_1.DataBaseModel {
    constructor(id = '', data) {
        super(id, data);
        if (data) {
            this.data = data;
        }
        else {
            this.data = {
                id_user: 0,
                user_name: '',
                group_name: '',
                id_student: 0,
                score: 0,
                id_class: 0,
                id_teacher: 0,
                name_teacher: '',
                id_subject: 0,
                subject_name: '',
                attendance: 0
            };
        }
    }
}
exports.StudentInfoModel = StudentInfoModel;
