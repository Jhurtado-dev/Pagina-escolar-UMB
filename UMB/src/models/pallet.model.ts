import { DataBaseModel } from "./data_base.model";

export class PalletModel extends DataBaseModel{
    data: {
        date_cut:string,
		plant:string,
		no_p_plant:string,
		quality_plant:string,
		quality_nce:string,
		descalification:string,
		boxes_plant:number,
		boxes_nce:number, 
		dif_boxes:number,
		net_weight_plant:number, 
		net_weight_nce:number, 
		dif_net_weight:number, 
		tara:number,
		total_weight_nce:number,
		unit:string,
		temperature:number,
		fleje:string,
		coments:string,
		n_a:string,
		code:string,
		tara_boxes:number, 
		id_box_plant:number,
		id_box_nce:number,
		id_type_pallet:number,
		id_transport:number,
		created_by:string ,
    };

    constructor(id:string ='', data?:any){
super(id, data);
if (data) {
    this.data = data;
} else {
    this.data = {
        date_cut:'',
		plant:'',
		no_p_plant:'',
		quality_plant:'',
		quality_nce:'',
		descalification:'',
		boxes_plant:0,
		boxes_nce:0, 
		dif_boxes:0,
		net_weight_plant:0, 
		net_weight_nce:0, 
		dif_net_weight:0, 
		tara:0,
		total_weight_nce:0,
		unit:'',
		temperature:0,
		fleje:'',
		coments:'',
		n_a:'',
		code:'',
		tara_boxes:0, 
		id_box_plant:0,
		id_box_nce:0,
		id_type_pallet:0,
		id_transport:0,
		created_by:'', 
    }
}
    }
}
