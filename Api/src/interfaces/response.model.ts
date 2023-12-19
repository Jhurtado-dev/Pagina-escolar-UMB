import { DataBaseModel } from "./data_Base.model";

export class ResponseModel extends DataBaseModel {
  data: {
    date: string,
    message: string,
    description: string,
    response: any
  };


  constructor(id: string  = '', data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        date: '',
        message: 'ok',
        description: '',
        response: ''
      };
    }
  }
}

export interface ResponseModel {
    date: string,
    message: string,
    description: string,
    response: any
  }