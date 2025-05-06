import { DataBaseModel } from "./data_base.model";

export class RoleModel extends DataBaseModel {
  data: {
    group_name: string;
  };

  constructor(id: string = '', data?: any){
  super(id,data);
    if(data){
      this.data = data;
    } else {
      this.data = {
        group_name: ''
      }
    }
  }

}
