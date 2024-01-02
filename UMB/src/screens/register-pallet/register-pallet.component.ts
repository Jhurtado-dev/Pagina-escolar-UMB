import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PalletModel } from 'src/models/pallet.model';
import { ResponseModel } from 'src/models/response.model';
import { PdfService } from 'src/services/pdf.service';
import { TransportService } from 'src/services/transport.service';

@Component({
  selector: 'app-register-pallet',
  templateUrl: './register-pallet.component.html',
  styleUrls: ['./register-pallet.component.css']
})
export class RegisterPalletComponent implements OnInit {

  studentSchedule = [];
  constructor(
    public transportService : TransportService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getStudentSchedule()
  }
  
  resetForm(formGroup: FormGroup) {
    formGroup.reset(); // Esto limpiará los valores y el estado del formulario
  }

  

  getStudentSchedule() {
    this.transportService.getSchedule().subscribe((res: ResponseModel) => {
      this.studentSchedule = res.data.response.userData;
    });
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
