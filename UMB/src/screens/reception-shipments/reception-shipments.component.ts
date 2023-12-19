import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantsServices } from 'src/services/plants.service';
import { DriversServices } from 'src/services/drivers.service';
import { TransportService } from 'src/services/transport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransportModel } from 'src/models/transport.model';
import { ResponseModel } from 'src/models/response.model';
import * as moment from 'moment';


@Component({
  selector: 'app-reception-shipments',
  templateUrl: './reception-shipments.component.html',
  styleUrls: ['./reception-shipments.component.css'],
})
export class ReceptionShipmentsComponent implements OnInit {
  optionSelected: any = '1';
  plants = [];
  drivers = [];
 transportModel : TransportModel = new TransportModel();

  dateFormContrl = new FormControl('',[
    Validators.required
  ]);

  plantFormContrl = new FormControl('', [
    Validators.required,
  ]);
  
  tripFormContrl = new FormControl('',[
    Validators.required
  ]);

  billFormContrl = new FormControl('',[
    Validators.required
  ]);
  platesFormContrl = new FormControl('',[
    Validators.required
  ]);
  destinationFormContrl = new FormControl('',[
    Validators.required
  ]);
  driverFormControl = new FormControl('',[
    Validators.required
  ]);
  temperatureFormContrl = new FormControl('',[
    Validators.required
  ]);
  check1Formcontrol = new FormControl('',[
    Validators.required
  ]);
  check2Formcontrol = new FormControl('',[
    Validators.required
  ]);
  comentFormcontrol = new FormControl('',[
    Validators.required    
  ]);

  shipmentsForm = new FormGroup({
    plant: this.plantFormContrl,
    trip: this.tripFormContrl,
    bill: this.billFormContrl,
    plates: this.platesFormContrl,
    destination: this.destinationFormContrl,
    driver: this.driverFormControl,
    temperature: this.temperatureFormContrl,
    check1: this.check1Formcontrol,
    check2: this.check2Formcontrol,
    coment: this.comentFormcontrol,
    date: this.dateFormContrl
  });
  constructor(
    public plantsService : PlantsServices,
    public driversService : DriversServices,
    public transportService : TransportService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.getPlants();
    this.getDrivers();
  }
 
  getCurrentDateTime(): string {
    const currentDate = new Date();
    return currentDate.toISOString();
  }

  getPlants() {
    this.plantsService.getAll().subscribe(responseModel => {
      this.plants = responseModel['data'];
    });
  }
  getDrivers(){
  this.driversService.getAll().subscribe(responseModel => {
    this.drivers =responseModel['data'];
  })
  }
  filterByPhase(phaseId) {

    if (phaseId !== 'all') {

    } else {
    }
  }

  createTransport(){
    this.transportModel.data.plant = this.shipmentsForm.value.plant.name
    this.transportModel.data.travel= this.shipmentsForm.value.trip
    this.transportModel.data.bill = this.shipmentsForm.value.bill
    this.transportModel.data.license_plate = this.shipmentsForm.value.plates
    this.transportModel.data.destination = this.shipmentsForm.value.destination
    this.transportModel.data.name_driver = this.shipmentsForm.value.driver.name_chofer + ' ' + this.shipmentsForm.value.driver.lastName_user
    this.transportModel.data.temperature = this.shipmentsForm.value.temperature
    this.transportModel.data.cleaning = this.shipmentsForm.value.check1
    this.transportModel.data.arrangement = this.shipmentsForm.value.check2
    this.transportModel.data.coments = this.shipmentsForm.value.coment
    this.transportModel.data.created_at = moment(this.shipmentsForm.value.date).format('YYYY-MM-DD')
   
   this.transportService.createTransport(this.transportModel).subscribe(
    (res) => {
      console.log('Transporte creado con éxito');
    },
    (err) => {
      console.log('Error al crear el transporte', err);
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
