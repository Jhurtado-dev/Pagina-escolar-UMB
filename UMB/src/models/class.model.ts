import { DataBaseModel } from "./data_base.model";

export class ClassModel extends DataBaseModel {
  data: {
    id_subject: number,
    id_teacher: number,
    id_schedule: number,
    status: number,
    created_at: string,
    modified_at: string,
    created_by: string,
    modified_by: string
  };

  constructor(id: string = '', data?: any){
  super(id,data);
    if(data){
      this.data = data;
    } else {
      this.data = {
        id_subject: 0,
        id_teacher: 0,
        id_schedule: 0,
        status: 0,
        created_at: '',
        modified_at: '',
        created_by: '',
        modified_by: ''
      }
    }
  }

}
