import { DataBaseModel } from './data_Base.model';

export class StudentForTeacherModel extends DataBaseModel {
  data: {
    id_class: number;
    id_subject: number;
    id_student: number;
    id_attendance: number;
    subject_name:string;
    score:number;
    attendance:number;
    name:string;
    last_name:string;
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        id_class: 0,
        id_subject: 10,
        id_student: 0,
        id_attendance: 0,
        subject_name: "",
        score: 0,
        attendance: 0,
        name: "",
        last_name: ""
      };
    }
  }
}