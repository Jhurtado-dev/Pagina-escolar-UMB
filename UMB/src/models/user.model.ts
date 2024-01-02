import { DataBaseModel } from './data_Base.model';

export class UserModel extends DataBaseModel {
  data: {
    id_user: number;
    user_name: string;
    id_role: number;
    role_name: string;
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        id_user: 0,
        user_name: '',
        id_role: 0,
        role_name: '',
      };
    }
  }
}
