import { DataBaseModel } from './data_Base.model';

export class StudentList extends DataBaseModel {
  data: {
    id_user: number;
    user_name: string;
    name: string;
    last_name: string;
    phone:string;
    group_name:string;
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        id_user: 0,
        user_name: '',
        name: '',
        last_name: '',
        phone:'',
        group_name:''
      };
    }
  }
}