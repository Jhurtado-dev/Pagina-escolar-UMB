import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseModel } from 'src/models/response.model';
import { StudentList } from 'src/models/student_list-model';
import { UserModel } from 'src/models/user.model';
import * as moment from 'moment';
import { AuthenticationService } from 'src/services/Authentication/authentication.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['../../style-catalogs.scss']
})

export class UserFormComponent implements OnInit {
  iconEye = "visibility"
  typePassword = "password"
  passwordRequired = true;
  userModel: StudentList = new StudentList();
  title = 'Nuevo';
  domainValidator;
  plants = [];
  plantsCtrl = [];
  selectedPlants = [];
  selectedPlantsDefault = [];
  currentAssignedPlants = [];
  currentPlantDefault = '';
  userPlants = [];
  Class = [];


  NameFormContrl = new FormControl('', [
    Validators.required,
  ]);

  userNameFormContrl = new FormControl('', [
    Validators.required,
  ]);

  birtDayFormControl = new FormControl('',[
  ]);

  lastNmaeFormContrl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormContrl = new FormControl('', [
  ]);

  emailFormContrl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  groupFormContrl = new FormControl('', [
    Validators.required,
  ]);

  classFormContrl = new FormControl('', [
    Validators.required,
  ]);
  phoneFormContrl = new FormControl('', [
    Validators.required,
  ]);


  userForm = new FormGroup({
    name: this.NameFormContrl,
    last_name :this.lastNmaeFormContrl,
    birth_day: this.birtDayFormControl,
    phone: this.phoneFormContrl,
    email: this.emailFormContrl,
    group: this.groupFormContrl,
    user_name:this.userNameFormContrl,
    class: this.classFormContrl,
    password:this.passwordFormContrl,
  });


  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    
    if (this.data.userData) {
      // Si hay datos de usuario, inicializa el formulario con esos datos
      this.userModel.data = this.data.userData;
      this.userForm.patchValue({
        email: this.userModel.data.user_name,
        name: this.userModel.data.name ,
        last_name: this.userModel.data.last_name,
        group: this.userModel.data.group_name,
        phone: this.userModel.data.phone
      });
      this.title = 'Editar';
    }
  }

  
  loadInfoClass(idClass){
    this.Class = [];
    this.userService.getClassId(idClass).subscribe(
      (responseModel: ResponseModel ) => {
        if(responseModel.data.response.classes.length > 0){
          this.Class = responseModel.data.response.classes;
        }
      }
      );
    }
    
    createUser(){
      const name= this.userForm.get('name').value
      const last_name= this.userForm.get('last_name').value
      const birth_date = this.userForm.get('birth_day').value;
      const phone= this.userForm.get('phone').value;
      const email= this.userForm.get('email').value;
      const id_group=this.userForm.get('group').value;
      const user_name= name.charAt(0).toLowerCase() + last_name.split(' ')[0].toLowerCase();
      const password=this.userForm.get('password').value;
      const id_class=this.userForm.get('class').value;
      
      this.userService.createStudent(name,last_name, birth_date, phone, email, id_group, user_name, password, id_class).subscribe(
        (responseModel: ResponseModel)=>{
          if (responseModel.data.message === 'ok') {
            this.showMessage('Registro actualizado correctamente', 'success-snackbar');
            this.dialogRef.close();
          } else {
            this.showMessage('Error al actualizar el registro, el usuario ya existe', 'error-snackbar');
            this.dialogRef.close();
          }
      },(err)=>{
        this.showMessage('Error de conexión', 'error-snackbar');
      });
    }

  updateStudentInfo(){
      const iduser = this.userModel.data.id_user;
      const name = this.userForm.get('name').value;
      const lastname = this.userForm.get('last_name').value;
      const phone = this.userForm.get('phone').value;
      const idgroup = this.userForm.get('group').value;

      this.userService
        .updateStudentInfo(iduser, name, lastname, phone, idgroup)
        .subscribe(
          (responseModel: ResponseModel) => {
            if (responseModel.data.message === 'ok') {
              this.showMessage('Registro actualizado correctamente', 'success-snackbar');
              this.dialogRef.close();
            } else {
              this.showMessage('Error al actualizar el registro', 'error-snackbar');
              this.dialogRef.close();
            }
          },
          (err) => {
            this.showMessage('Error de conexión', 'error-snackbar');
          }
        );
  }

  showPassword(){
    if (this.typePassword === 'password') {
      this.typePassword = "text";
      this.iconEye = "visibility_off";
    }else{
      this.typePassword = "password";
      this.iconEye = "visibility"
    }
  }

  registerOrUpdate(){
    if (this.title === 'Nuevo'){
      this.createUser();
    }else{
      this.updateStudentInfo();
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

}
