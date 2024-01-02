import { DataBaseModel } from "./data_base.model";

export class StudentInfoModel extends DataBaseModel {
  data: {
    id_user: number;
    user_name: string;
    group_name: string;
    id_student: number;
    score:number;
    id_class:number;
    id_teacher:number;
    name_teacher:string;
    id_subject: number;
    subject_name:string;
    attendance:number;
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        id_user: 0,
        user_name: '',
        group_name: '',
        id_student: 0,
        score:0,
        id_class:0,
        id_teacher:0,
        name_teacher:'',
        id_subject: 0,
        subject_name:'',
        attendance:0
      };
    }
  }
}