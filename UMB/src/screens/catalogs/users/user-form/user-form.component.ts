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

  userNameFormContrl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormContrl = new FormControl('', [
  ]);

  nameFormContrl = new FormControl('', [
    Validators.required,
  ]);

  emailFormContrl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  roleFormContrl = new FormControl('', [
    Validators.required,
  ]);

  plantsFormContrl = new FormControl('', []);

  plantDefautlFormContrl = new FormControl('', [
    Validators.required,
  ]);

  userForm = new FormGroup({
    user_name: this.userNameFormContrl,
    password: this.passwordFormContrl,
    name: this.nameFormContrl,
    email: this.emailFormContrl,
    role: this.roleFormContrl,
    plants: this.plantsFormContrl,
    plant_default: this.plantDefautlFormContrl
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
    this.plantsFormContrl.setValue("Seleccionar");
    this.data.plants.forEach(plant => {
      this.plants.push(plant.id_plant);
      this.plantsCtrl.push(new FormControl(false, []));
    });
    if (this.data.userData !== undefined) {
      this.userModel = this.data.userData;
      this.title = 'Actualizar';
      this.loadUserData();
      this.passwordRequired = false;
    }
  }

  async loadUserData() {
    await this.loadUserPlants(this.userModel.data.email); 
    this.selectedPlants = [];
    this.emailFormContrl.disable();
    if (this.userModel.data.id_plant === '') {
      const plantDefault = this.userPlants.find(plant => plant.user_plant_status === 1);
      this.userModel.data.id_plant = plantDefault.id_plant;
      this.currentPlantDefault = plantDefault.id_plant;
    }
    this.userForm.setValue({
      user_name: this.userModel.data.user_name,
      password: this.userModel.data.password,
      name: this.userModel.data.name,
      email: this.userModel.data.email,
      role: this.userModel.data.id_role,
      plants: "Seleccionar",
      plant_default: this.userModel.data.id_plant
    });
    this.userModel.data.plants.forEach(plant => {
      this.selectedPlants.push(plant);
      const i = this.plants.findIndex(plantFind => plantFind === plant);
      this.plantsCtrl[i].setValue(true);
      this.currentAssignedPlants.push(plant);
    })
    this.userPlants.forEach(plant => {
      this.selectedPlantsDefault.push(plant.id_plant);
    });
  }

  loadUserPlants(email: String){
    this.userPlants = [];
    return new Promise((resolve) => {
      this.authenticationService.getUserPlants(email)
      .subscribe((responseModel: ResponseModel)=>{
        if (responseModel.data.response.length > 0) {
          this.userPlants = responseModel.data.response;
          resolve(true);
        } else {
          this.userPlants = []
          resolve(true);
        }
      })
    });
  }


  emailValidator(value) {
    if (/@monteblanco.com.mx\s*$/.test((value).toString())) {
      this.domainValidator = true;
    } else {
      this.domainValidator = true;
    }
  }

  addOrUpdate() {
    this.userModel.data.name = this.userForm.value.name;
    this.userModel.data.email = this.emailFormContrl.value;
    this.userModel.data.user_name = this.userForm.value.user_name;
    this.userModel.data.password = this.userForm.value.password;
    this.userModel.data.id_role = this.userForm.value.role;
    this.userModel.data.id_plant = this.userForm.value.plant_default;
    if (this.data.userData !== undefined) {
      this.userModel.id = this.userModel.id;
      this.userService.update(this.userModel).subscribe(
        async() => {
           const res = await this.updateUserPlants();
           if (res) {
             this.showMessage('El usuario ' + this.userModel.data.name + ' se actualizó correctamente', 'success-snackbar');
             this.dialogRef.close();
           } else {
             this.showMessage('Error al actualizar las plantas del usuario.', 'error-snackbar');
           }
          this.showMessage('El usuario ' + this.userModel.data.name + ' se actualizó correctamente', 'success-snackbar');
          this.dialogRef.close();
        },
        (err) => {
          if (err.error.data !== undefined) {
            this.showMessage('El usuario ya existe', 'error-snackbar');
          } else {
            this.showMessage('Error de conexión', 'error-snackbar');
          }
        },
      );
    } else {
      this.userService.create(this.userModel).subscribe(
        async() => {
           const res = await this.createUserPlants();
           if (res) {
             this.showMessage('El usuario ' + this.userModel.data.name + ' se creó correctamente', 'success-snackbar');
             this.dialogRef.close();
           } else {
             this.showMessage('Error al crear las plantas del usuario.', 'error-snackbar');
           }
          this.showMessage('El usuario ' + this.userModel.data.name + ' se creó correctamente', 'success-snackbar');
          this.dialogRef.close();
        },
        (err) => {
          if (err.error.data !== undefined) {
            this.showMessage('El usuario ya existe', 'error-snackbar');
          } else {
            this.showMessage('Error de conexión', 'error-snackbar');
          }
        },
      );
    }
  }

  createUserPlants(){
    return new Promise((resolve)=> {
      const plantsWithoutDefault = this.selectedPlants.filter(plant => plant !== this.userModel.data.id_plant);
      if (plantsWithoutDefault.length > 0) {
        plantsWithoutDefault.forEach((plant,index) => {
          const userPlant = new UserModel();
          let error = false;
          userPlant.data.email = this.userModel.data.email;
          userPlant.data.id_plant = plant;
          if (plant === this.userModel.data.id_plant) {
            userPlant.data.status = 1;
          }else{
            userPlant.data.status = 0;
          }
          this.userService.createUserPlant(userPlant)
          .subscribe(
            () => {},
            (err) => {
              error = true;
            },
          )
          if (error) {
            resolve(false);
          }else if(!error && index === plantsWithoutDefault.length-1){
            resolve(true);
          }
        });
      }
    });
  }

  updateUserPlants(){
    const newsPlants = [];
    const deletePlants = [];
    const withoutChange = [];
    
    this.selectedPlants.forEach(selectedPlant => {
      if (!this.currentAssignedPlants.includes(selectedPlant)) {
        newsPlants.push(selectedPlant);
      }
    })
    this.currentAssignedPlants.forEach(currentPlant => {
      if (!this.selectedPlants.includes(currentPlant)) {
        deletePlants.push(currentPlant);
      }
    })

    this.selectedPlants.forEach(selectedPlant => {
      if (!newsPlants.includes(selectedPlant) && !deletePlants.includes(selectedPlant)) {
        withoutChange.push(selectedPlant);
      }
    })
    if (this.currentPlantDefault !== '') {
      withoutChange.push(this.currentPlantDefault);
    }
    if (!this.selectedPlants.includes(this.plantDefautlFormContrl.value) && this.selectedPlantsDefault.includes(this.plantDefautlFormContrl.value)) {
      withoutChange.push(this.plantDefautlFormContrl.value);
    }


    return new Promise(resolve => {
      let error = false;
      if (newsPlants.length > 0) {
        newsPlants.forEach((newPlant, index) => {
          const userPlant = new UserModel();
          userPlant.data.email = this.userModel.data.email;
          userPlant.data.id_plant = newPlant;
          if (newPlant === this.userModel.data.id_plant) {
            userPlant.data.status = 1;
          } else {
            userPlant.data.status = 0;
          }
          this.userService.createUserPlant(userPlant)
          .subscribe(
            () => {},
            (err) => {
              error = true;
            },
          )
          if (error) {
            resolve(false);
          }else if(!error && index === newsPlants.length-1 && deletePlants.length === 0){
            resolve(true);
          }
        })
      };

      if (deletePlants.length > 0) {
        deletePlants.forEach((deletePlant, index) => {
          const userPlant = new UserModel();
          userPlant.id = this.userModel.id;
          userPlant.data.email = this.userModel.data.email;
          userPlant.data.id_plant = deletePlant;
          userPlant.data.status = 2;
          this.userService.updateUserPlant(userPlant)
          .subscribe(
            () => {},
            (err) => {
              error = true;
            },
          )
          if (error) {
            resolve(false);
          }else if(!error && index === deletePlants.length-1){
            resolve(true);
          }
        })
      };

      if (withoutChange.length > 0 ) {
        withoutChange.forEach((plant, index) => {
            const userPlant = new UserModel();
            userPlant.id = this.userModel.id;
            userPlant.data.email = this.userModel.data.email;
            userPlant.data.id_plant = plant;
            if (plant === this.userModel.data.id_plant) {
              userPlant.data.status = 1;
            }else{
              userPlant.data.status = 0;
            }
            this.userService.updateUserPlant(userPlant)
            .subscribe(
              () => {},
              (err) => {
                error = true;
              },
            )
            if (error) {
              resolve(false);
            }else if(!error && index === withoutChange.length-1){
              resolve(true);
            }
        })
      }
      resolve(true);
    })
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

  clickPlantCheck(e, plantSelected: string){
    if (e.target.nodeName === 'SPAN' || e.target.nodeName === 'LABEL' ) {
      if (!this.selectedPlants.find(plant => plant === plantSelected)) {
        this.selectedPlants.push(plantSelected);
      }else{
        if (plantSelected === this.plantDefautlFormContrl.value) {
          this.plantDefautlFormContrl.setValue('');
        }
        this.selectedPlants = this.selectedPlants.filter(plant => plant !== plantSelected);
      }
      if (!this.selectedPlantsDefault.find(plant => plant === plantSelected)) {
        this.selectedPlantsDefault.push(plantSelected);
      }else{
        this.selectedPlantsDefault = this.selectedPlantsDefault.filter(plant => plant !== plantSelected);
      }
    } 
    this.plantsFormContrl.setValue("Seleccionar");
    e.stopPropagation();
  }

  clickOption(){
    this.plantsFormContrl.setValue("Seleccionar");
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

}
