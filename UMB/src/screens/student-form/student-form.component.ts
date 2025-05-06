import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseModel } from 'src/models/response.model';
import { UserModel } from 'src/models/user.model';
import { AuthenticationService } from 'src/services/Authentication/authentication.service';
import { UserService } from 'src/services/user.service';
import { UserFormComponent } from '../catalogs/users/user-form/user-form.component';
import { ProvidersService } from 'src/services/providers.service';
import { StudentForTeacherModel } from 'src/models/student_for_teacher.model';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  iconEye = "visibility"
  typePassword = "password"
  passwordRequired = true;
  userModel: StudentForTeacherModel = new StudentForTeacherModel();
  title = 'Nuevo';
  domainValidator;
  plants = [];
  plantsCtrl = [];
  selectedPlants = [];
  selectedPlantsDefault = [];
  currentAssignedPlants = [];
  currentPlantDefault = '';
  userPlants = [];
  isDisabled : boolean = true;
  studentAttendance = new FormControl('', [
    Validators.required,
  ]);

  studentScore = new FormControl('', [
  ]);

  nameFormContrl = new FormControl('', [
    Validators.required,
  ]);

  userForm = new FormGroup({
    name: this.nameFormContrl,
    attendance: this.studentAttendance,
    score: this.studentScore
  });

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private providerService : ProvidersService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isDisabled = true
    if (this.data.userData) {
      // Si hay datos de usuario, inicializa el formulario con esos datos
      this.userModel.data = this.data.userData;
      this.userForm.patchValue({
        name: this.userModel.data.name + ' ' + this.userModel.data.last_name,
        attendance: this.userModel.data.attendance,
        score: this.userModel.data.score
      });
      this.title = 'Editar';
    }
  }

  performValidations(): boolean {
    const attendanceControl = this.userForm.get('attendance');
    const scoreControl = this.userForm.get('score');

    if (!attendanceControl || !scoreControl) {
      return false; // Si los controles no están presentes, no se puede validar
    }

    const attendanceValue = attendanceControl.value;
    const scoreValue = scoreControl.value;

    // Validar rango de asistencias
    if (attendanceValue < 0 || attendanceValue > 28) {
      this.showMessage('Error: Las asistencias deben estar entre 0 y 28', 'error-snackbar');
      return false;
    }

    // Validar rango de calificación
    if (scoreValue < 0 || scoreValue > 100) {
      this.showMessage('Error: La calificación debe estar entre 0 y 100', 'error-snackbar');
      return false;
    }

    return true; // Todas las validaciones pasaron
  }


   // Función para manejar la actualización con validaciones
   updateScoreAndAttendance() {
    if (this.performValidations()) {
      const idAttendance = this.userModel.data.id_attendance;
      const idClass = this.userModel.data.id_class;
      const idStudent = this.userModel.data.id_student;

      const score = this.userForm.get('score').value;
      const attendance = this.userForm.get('attendance').value;

      this.providerService
        .updateScoreAndAttendance(idAttendance, idClass, idStudent, score, attendance)
        .subscribe(
          (responseModel: ResponseModel) => {
            if (responseModel.data.message === 'ok') {
              this.showMessage('Registro actualizado correctamente', 'success-snackbar');
              this.dialogRef.close();
            } else {
              console.log(responseModel.data.message);

              this.showMessage('Error al actualizar el registro', 'error-snackbar');
              this.dialogRef.close();
            }
          },
          (err) => {
            this.showMessage('Error de conexión', 'error-snackbar');
          }
        );
    }
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

  loadUserData() {


  }

}
