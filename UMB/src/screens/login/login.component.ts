import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/services/Authentication/storage.service';
import { AuthenticationService } from 'src/services/Authentication/authentication.service';
import { SessionModel } from 'src/models/session.model';
import { UserModel } from 'src/models/user.model';
import { ResponseModel } from 'src/models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  plants = []

  isLoading = false;
  public submitted = false;
  public error: { code: number, message: string } = null;

  usuarioFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  plantFormControl = new FormControl('', [
    Validators.required
  ]);
  loginForm = new FormGroup({
    email: this.usuarioFormControl,
    password: this.passwordFormControl,
  });

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.setAuthListener();
  }

  setAuthListener() {
    const authenticate = this.storageService.isAuthenticated();
    if (authenticate) {
      if (this.router.url === '/login' || this.router.url === '/') {
      this.router.navigate(['/emicelio']);
      }
    }
  }


  submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (responseModel: ResponseModel) => {
          console.log('Response Model:', responseModel);
          if (responseModel.data.message !== 'error') {
            const sessionData = new SessionModel();
            const userModel = new UserModel();
            userModel.id = responseModel.data.response.userData.id_user;
            userModel.data.id_user = responseModel.data.response.userData.id_user;
            userModel.data.user_name = responseModel.data.response.userData.user_name;
            userModel.data.id_role = responseModel.data.response.userData.id_role;
            userModel.data.role_name = responseModel.data.response.userData.role_name;
            
            sessionData.user = userModel;
            sessionData.token = responseModel.data.response.token;
            //location.reload();
            this.correctLogin(sessionData);
          } else {
            this.isLoading = false;
            this.snackBar.open(
              'Datos invalidos', 'Cerrar',
              {
                duration: 2000,
                panelClass: ['error-snackbar']
              }
            );
          }
        },
        error => {
          this.error = error;
        }
      )
    }
  }

  private correctLogin(data: SessionModel) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/UMB']);
    location.reload();
  }

  /* async loadUserPlants(e){
    if(e.target.value !== ''){
      await this.getUserPlants(e.target.value);
    }
  } */

/*   getUserPlants(email: String){
    return new Promise((resolve) => {
      this.authenticationService.getUserPlants(email)
      .subscribe((responseModel: ResponseModel)=>{
        if (responseModel.data.response.length > 0) {
          this.plants = responseModel.data.response;
          const defaultPlant = responseModel.data.response.find(plant => plant.user_plant_status === 1);
          this.plantFormControl.setValue(defaultPlant);
          resolve(true);
        } else {
          this.plants = []
          resolve(true);
        }
      })
    });
  } */
}


