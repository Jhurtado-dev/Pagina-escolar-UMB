import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/services/transport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseModel } from 'src/models/response.model';


@Component({
  selector: 'app-reception-shipments',
  templateUrl: './reception-shipments.component.html',
  styleUrls: ['./reception-shipments.component.css'],
})

export class ReceptionShipmentsComponent implements OnInit {
  
  studentGrades = [];
  constructor(
    public transportService : TransportService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
   this.getStudentGrades()
  }
 
  
  getStudentGrades() {
    this.transportService.getGrades().subscribe((res: ResponseModel) => {
      this.studentGrades = res.data.response.userData;
      
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
