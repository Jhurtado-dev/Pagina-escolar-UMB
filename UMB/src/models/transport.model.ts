import { DataBaseModel } from "./data_base.model";

export class TransportModel extends DataBaseModel{
    data: {
        plant:string,
        travel: number,
        bill:string,
        license_plate: string,
        destination: string,
        name_driver: string,
        temperature: string,
        cleaning: string,
        arrangement: string,
        coments: string,
        created_at: string,
        id_plant: string,
        created_by:string,
    };

    constructor(id:string ='', data?:any){
super(id, data);
if (data) {
    this.data = data;
} else {
    this.data = {
        plant:'',
        travel: 0,
        bill:'',
        license_plate: '',
        destination: '',
        name_driver: '',
        temperature: '',
        cleaning: '',
        arrangement: '',
        coments: '',
        created_at: '',
        id_plant: '',
        created_by:'',
    }
}
    }
}
