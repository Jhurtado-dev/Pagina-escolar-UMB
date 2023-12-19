import { DataBaseModel } from "./data_Base.model";

export class UserModel extends DataBaseModel {
  data: {
    name: string;
    email: string;
    user_name: string;
    password: string;
    id_role: number;
    role: string;
    created_by: string;
    modified_by: string;
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
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