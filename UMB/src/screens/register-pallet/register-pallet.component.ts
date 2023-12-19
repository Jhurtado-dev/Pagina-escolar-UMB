import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PalletModel } from 'src/models/pallet.model';
import { ResponseModel } from 'src/models/response.model';
import { PalletsService } from 'src/services/pallets.service';
import { PdfService } from 'src/services/pdf.service';
import { TransportService } from 'src/services/transport.service';

@Component({
  selector: 'app-register-pallet',
  templateUrl: './register-pallet.component.html',
  styleUrls: ['./register-pallet.component.css']
})
export class RegisterPalletComponent implements OnInit {

  pallets= [];
  boxes=[];
  skus=[];
  Ucj =['G','5','454'];
  taraBox 
  taraPallet 
  netWeigth 
  unit
  weightMin
  weightMax
  difKg  
  idTransport
  idPlant

  palletModel : PalletModel = new PalletModel();
  

skuFormControl = new FormControl('', [
  Validators.required
]);
number_boxesFormControl = new FormControl('', [
  Validators.required
]);
net_weightFormControl = new FormControl('', [
  Validators.required
]);
dateCutFormControl= new FormControl('', [
  Validators.required
]);
number_ticketFormControl = new FormControl('', [
  Validators.required
]);
box_typeFormControl = new FormControl('', [
  Validators.required
]);  
sku2FormControl = new FormControl('', [
  Validators.required
]);
number_boxes2FormControl = new FormControl('', [
  Validators.required
]);
total_weightFormControl = new FormControl('', [
  Validators.required
]);
fact_weightFormControl = new FormControl('', [
  Validators.required
]);
box_type2FormControl = new FormControl('', [
  Validators.required
]);
number_ticket2FormControl = new FormControl('', [
  Validators.required
]);
pallet_typeFormControl = new FormControl('', [
  Validators.required
]);
unitFormControl = new FormControl('', [
  Validators.required
]);
temperatureFormControl = new FormControl('', [
  Validators.required
]);
flejeFormControl = new FormControl('', [
  Validators.required
]);
net_weight2FormControl = new FormControl('', [
  Validators.required
]);
taraFormControl = new FormControl('', [
  Validators.required
]);
reclasificationFormControl = new FormControl('', [
  Validators.required
]);
dif_boxesFormControl = new FormControl('', [
  Validators.required
]);
min_weightFormControl = new FormControl('', [
  Validators.required
]);
max_weightFormControl = new FormControl('', [
  Validators.required
]);
dif_kgFormControl = new FormControl('', [
  Validators.required
]);
codeFormControl = new FormControl('', [
  Validators.required
]);
commentsFormControl = new FormControl('', [
  Validators.required
]);

palletForm = new FormGroup({
  sku :this.skuFormControl,
  number_boxes:this.number_boxesFormControl,
  net_weight:this.net_weightFormControl,
  dateCut:this.dateCutFormControl,
  number_ticket:this.number_ticketFormControl,
  box_type:this.box_typeFormControl,
  sku2:this.sku2FormControl,
  number_boxes2:this.number_boxes2FormControl,
  total_weight:this.total_weightFormControl,
  fact_weight:this.fact_weightFormControl,
  box_type2:this.box_type2FormControl,
  number_ticket2:this.number_ticket2FormControl,
  pallet_type:this.pallet_typeFormControl,
  unit:this.unitFormControl,
  temperature:this.temperatureFormControl,
  fleje:this.flejeFormControl,
  net_weight2:this.net_weight2FormControl,
  tara:this.taraFormControl,
  reclasification:this.reclasificationFormControl,
  dif_boxes:this.dif_boxesFormControl,
  min_weight:this.min_weightFormControl,
  max_weight:this.max_weightFormControl,
  dif_kg:this.dif_kgFormControl,
  code:this.codeFormControl,
  comments:this.commentsFormControl
  
})
  travel: any;
  factura: any;
  placas: any;

  constructor(
    public transportService : TransportService,
    public palletService: PalletsService,
    private snackBar: MatSnackBar,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.getTransport();
    this.getPallet();
    this.getSku();
    this.getBoxes();
  }

  formatDate(date: Date):string{
    return moment(date).format('YYYY') + '-' +
    moment(date).format('MM') + '-' +
    moment(date).format('DD') + ' ' +
    moment(date.setHours(date.getHours() + 1)).format('HH') + ':' +
    moment(date).format('mm') + ':' +
    moment(date).format('ss');
    //return `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString().padStart(2, '0')}-${date.getDate().toLocaleString().padStart(2, '0')} ${date.getHours().toLocaleString('es-ES').padStart(2, '0')}:${date.getMinutes().toLocaleString().padStart(2, '0')}:${date.getSeconds().toLocaleString().padStart(2, '0')}`;
  }
  
  resetForm(formGroup: FormGroup) {
    formGroup.reset(); // Esto limpiará los valores y el estado del formulario
  }

  getPallet(){
    this.palletService.getPallet()
    .subscribe((responseModel)=>{      
      this.pallets = responseModel['data'];
    })
  }
  getBoxes(){
    this.palletService.getBoxes()
    .subscribe((responseModel)=>{      
      this.boxes = responseModel['data'];
    })
  }
  getSku(){
    this.palletService.getSku()
    .subscribe((responseModel)=>{      
      this.skus = responseModel['data'];
    })
  }
  getTransport(){
    this.transportService.getTransport()
    .subscribe((responsModel:ResponseModel)=>{
      let data= responsModel.data.response;
      const lastTravel = data.length -1;
        this.idTransport = data[lastTravel].id;
        this.idPlant = data[lastTravel].id_plant;
        this.travel = data[lastTravel].travel;
        this.factura = data[lastTravel].bill;
        this.placas = data[lastTravel].license_plate;
        
    })
  }

  netweight(){
    let min = 0;
  this.taraBox =(this.palletForm.value.box_type2.weight_box * this.palletForm.value.number_boxes2);
  this.taraPallet = (this.taraBox + this.palletForm.value.pallet_type.weight_pallet).toFixed(1);
  this.netWeigth = (this.palletForm.value.total_weight - this.taraPallet).toFixed(1);
  this.difKg = (this.palletForm.value.net_weight - this.netWeigth).toFixed(1);
  this.unit = this.palletForm.value.unit;
  
  
  switch (this.unit) {
    case '5':
      this.weightMin = (this.palletForm.value.number_boxes2 * 5).toFixed(1);
    this.weightMax = (this.palletForm.value.number_boxes2 * 5.1).toFixed(1);
      break;
      case '454':
        this.weightMin = (this.palletForm.value.number_boxes2 * 4.54).toFixed(1);
        this.weightMax = (this.palletForm.value.number_boxes2 * 4.64).toFixed(1);
      break;
      case 'G':
        const min = (Number(this.netWeigth) * 0.01);
        this.weightMin = (Number(this.netWeigth) - min).toFixed(1);
        this.weightMax = (Number(this.netWeigth) + min).toFixed(1);
      break;
    default:
      break;
  }
  
  

  if (this.palletForm.value.pallet_type) {
    this.palletForm.patchValue({
      tara : this.taraPallet,
      net_weight2 : this.netWeigth,
      min_weight : this.weightMin,
      max_weight : this.weightMax,
      dif_kg : this.difKg,
      fact_weight : this.netWeigth
    });
  }

  }

  difBoxes(){
   this.palletForm.patchValue({
    dif_boxes:this.palletForm.value.number_boxes - this.palletForm.value.number_boxes2 
  }); 
  }

reclasification(){
  if (this.palletForm.value.sku2.sku != this.palletForm.value.sku.sku ) {
    this.palletForm.patchValue({
      reclasification: this.palletForm.value.sku2.sku
    });
}
 else{
  this.palletForm.patchValue({
    reclasification: ''
  });
 }   
  

}

createPallet(){
  this.palletModel.data.date_cut = moment(this.palletForm.value.dateCut).format('YYYY-MM-DD')
  this.palletModel.data.plant= this.idPlant
  this.palletModel.data.no_p_plant= this.palletForm.value.number_ticket
  this.palletModel.data.quality_plant= this.palletForm.value.sku.sku
  this.palletModel.data.quality_nce= this.palletForm.value.sku2.sku
  this.palletModel.data.descalification= this.palletForm.value.reclasification
  this.palletModel.data.boxes_plant= this.palletForm.value.number_boxes
  this.palletModel.data.boxes_nce= this.palletForm.value.number_boxes2
  this.palletModel.data.dif_boxes= this.palletForm.value.dif_boxes
  this.palletModel.data.net_weight_plant= this.palletForm.value.net_weight
  this.palletModel.data.net_weight_nce= this.palletForm.value.net_weight2
  this.palletModel.data.dif_net_weight= this.palletForm.value.dif_kg
  this.palletModel.data.tara= this.palletForm.value.tara
  this.palletModel.data.total_weight_nce= this.palletForm.value.total_weight
  this.palletModel.data.unit= this.palletForm.value.unit
  this.palletModel.data.temperature= this.palletForm.value.temperature
  this.palletModel.data.fleje= this.palletForm.value.fleje
  this.palletModel.data.coments= this.palletForm.value.comments
  this.palletModel.data.code= this.palletForm.value.code
  this.palletModel.data.tara_boxes= this.taraBox
  this.palletModel.data.id_box_plant= this.palletForm.value.box_type.id
  this.palletModel.data.id_box_nce= this.palletForm.value.box_type2.id
  this.palletModel.data.id_type_pallet= this.palletForm.value.pallet_type.id
  this.palletModel.data.id_transport= this.idTransport

  this.palletService.createPallet(this.palletModel,this.palletForm).subscribe(
    (res) => {
      console.log(this.palletModel.data);
      
      this.showMessage('Se guardo correctamente', 'success-snackbar');
      this.pdfService.generatePdf(this.palletModel.data, this.idPlant, this.travel, this.factura, this.placas); // Llama al servicio de PDF
    },
    (err) => {
      if (err.error.data !== undefined) {
        this.showMessage('Error al registrar', 'error-snackbar');
      } else {
        this.showMessage('Error de conexión', 'error-snackbar');
      }
    }
  ); 
  
}

showMessage(title, typeMessage) {
  this.snackBar.open(
    title, 'Cerrar',
     {
       duration: 2000,
       panelClass: [typeMessage]
     }
   );
}

}
