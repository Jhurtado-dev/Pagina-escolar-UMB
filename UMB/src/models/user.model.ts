import { DataBaseModel } from './data_base.model';

export class UserModel extends DataBaseModel {
  data: {
    name: string;
    email: string;
    user_name: string;
    password: string;
    id_role: number;
    role: string;
    id_plant: string;
    plants: string[];
    plant: string
    plant_status: number;
    status: number,
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
        id_plant: '',
        plant: '',
        plants: [],
        plant_status: 0,
        status: 0,
        created_by: '',
        modified_by: ''
      };
    }
  }
}
