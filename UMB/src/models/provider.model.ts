import { DataBaseModel } from './data_base.model';

export class ProviderModel extends DataBaseModel {
  data: {
    name: string,
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
        status: 0,
        created_by: '',
        modified_by: '',
      };
    }
  }
}


