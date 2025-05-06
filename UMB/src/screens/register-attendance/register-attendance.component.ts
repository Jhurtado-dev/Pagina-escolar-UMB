import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseModel } from 'src/models/response.model';
import { SessionModel } from 'src/models/session.model';
import { UserModel } from 'src/models/user.model';
import { ProvidersService } from 'src/services/providers.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentForTeacherModel } from 'src/models/student_for_teacher.model';

@Component({
  selector: 'app-register-attendance',
  templateUrl: './register-attendance.component.html',
  styleUrls: ['./register-attendance.component.scss']
})
export class RegisterAttendanceComponent implements OnInit {
  sessionModel: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  students: StudentForTeacherModel[] = [];
  dataSource = new MatTableDataSource(this.students);
  displayedColumns = ['alumno', 'materia' , 'asistencia', 'calificacion', 'edit'];
  isLoading = true;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    private providerService : ProvidersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadStudents()
  }

  loadStudents(){
    if (this.sessionModel.user.data.id_role === 3) {
      this.getAllStudentsForTeacher();
    } else {
      this.getAllStudents();
    }
  }

  filter(filterValue: string) {
    console.log(filterValue);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openFormDialog(studentForTeacherModel?: StudentForTeacherModel) {
    this.dialog.open(StudentFormComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: {
        userData: studentForTeacherModel  // Pasa los datos del usuario al componente de formulario
      },
    }).afterClosed().subscribe(result => {
        this.loadStudents();
    });
  }

  getAllStudents(){
    this.providerService.getAllStudents().subscribe(
      (resposeModel:ResponseModel)=>{
        const students = resposeModel.data.response;
        this.dataSource = students.studentsData;
      }
    )
   }

   getAllStudentsForTeacher(){
    this.providerService.getAllStudetForTeacher().subscribe(
      (resposeModel:ResponseModel)=>{
        const students = resposeModel.data.response;
        this.dataSource = students.studentsData;
      }
    )
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

  /* updateScoreAndAttendance(idAttendance: number, idClass: number, idStudent: number, score: number, attendance: number) {
    this.providerService.updateScoreAndAttendance(idAttendance, idClass, idStudent, score, attendance).subscribe(
      (responseModel: ResponseModel) => {
        if (responseModel.data.message === 'ok') {
          this.showMessage('Registro actualizado correctamente', 'success-snackbar');
        } else {
          this.showMessage('Error al actualizar el registro', 'error-snackbar');
        }
      },
      (err) => {
        this.showMessage('Error de conexión', 'error-snackbar');
      }
    );
  } */

}
