import { DataBaseModel } from './data_base.model';

export class PlantModel extends DataBaseModel {
  data: {
    name: string;
    bunker_number: number;
    pi_number: number;
    tunnel_number: number;
    house_number: number;
    water_tank_number: number;
    status: number;
    created_by: string,
    modified_by: string;
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        name: '',
        bunker_number: 0,
        pi_number: 0,
        tunnel_number: 0,
        house_number: 0,
        water_tank_number: 0,
        status: 0,
        created_by: '',
        modified_by: '',
      };
    }
  }
}
