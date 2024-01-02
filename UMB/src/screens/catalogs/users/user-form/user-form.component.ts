import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseModel } from 'src/models/response.model';
import { UserModel } from 'src/models/user.model';
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
  userModel: UserModel = new UserModel();
  title = 'Nuevo';
  domainValidator;
  plants = [];
  plantsCtrl = [];
  selectedPlants = [];
  selectedPlantsDefault = [];
  currentAssignedPlants = [];
  currentPlantDefault = '';
  userPlants = [];

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
   
  }

 

}
