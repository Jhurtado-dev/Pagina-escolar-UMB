import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderModel } from 'src/models/provider.model';
import { ResponseModel } from 'src/models/response.model';
import { StudentList } from 'src/models/student_list-model';
import { ProvidersService } from 'src/services/providers.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['../../style-catalogs.scss'],
})
export class FormProviderComponent implements OnInit {
  providerModel: ProviderModel = new ProviderModel();
  nameFormContrl = new FormControl('', [Validators.required]);
  title = 'Nuevo';
  iconEye = "visibility"
  typePassword = "password"
  passwordRequired = true;
  userModel: StudentList = new StudentList();
  Class =[];
  domainValidator;
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
    password:this.passwordFormContrl,
  });



  constructor(
    public dialogRef: MatDialogRef<FormProviderComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
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
      
      this.userService.createTeacher(name,last_name, birth_date, phone, email, id_group, user_name, password).subscribe(
        (responseModel: ResponseModel)=>{
          if (responseModel.data.message === 'ok') {
            this.showMessage('Registro realizado correctamente', 'success-snackbar');
            this.dialogRef.close();
          } else {
            this.showMessage('Error en el registro, el usuario ya existe', 'error-snackbar');
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

registerOrUpdate(){
  if (this.title === 'Nuevo'){
    this.createUser();
  }else{
    this.updateStudentInfo();
  }
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
