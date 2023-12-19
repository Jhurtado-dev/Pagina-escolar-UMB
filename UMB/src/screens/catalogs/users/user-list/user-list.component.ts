import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseModel } from 'src/models/response.model';
import { RoleModel } from 'src/models/role.model';
import { SessionModel } from 'src/models/session.model';
import { UserModel } from 'src/models/user.model';
import { AuthenticationService } from 'src/services/Authentication/authentication.service';
import { RoleServices } from 'src/services/role.service';
import { UserService } from 'src/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../style-catalogs.scss']
})
export class UserListComponent implements OnInit {

  sessionModel: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  Roles = [];

  users: UserModel[] = [];
  userPlants = [];
  dataSource = new MatTableDataSource(this.users);
  displayedColumns = ['id', 'plantId' , 'user' , 'name', 'role', 'email', 'edit','delete'];
  isLoading = true;
  userPromises: Promise<any[]>[] = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private roleServices: RoleServices,
    private authenticationService: AuthenticationService
  ) { }


  ngOnInit(): void {
    const sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
    const email = sessionData.user.data.email;
    this.dataSource.filterPredicate = (users: any, filter: string) => {
      return users.data.email.toLowerCase().includes(filter)
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Usuarios por vista';
    this.loadUserPlants(email).then(value => {
      this.loadUsers();
      this.loadRoles();
    });
  }

  loadRoles() {
    this.Roles = [];
    this.roleServices.getAll().subscribe(
      (responseModel: ResponseModel ) => {
        if(responseModel.data.response.length > 0){
          responseModel.data.response.forEach(roleData => {
            const roleModel = new RoleModel();
            roleModel.id = roleData.id;
            roleModel.data.name = roleData.name ;
            this.Roles.push(roleModel);
          });
        }
      }
    );
  }

 async loadUsers() {
    const valuesUsers = await this.getUsersPlants();
    valuesUsers.forEach(users => {
        users.forEach(user => {
          this.users.push(user);
        });
    })

    const users = [];
    this.users.forEach(userData => {
      const plants = [];
      let plant_default = '';
      const usersFilter = this.users.filter(user => user.data.email === userData.data.email);
      usersFilter.forEach(userFilter => {
        plants.push(userFilter.data.id_plant);
        if(userFilter.data.plant_status === 1){
          plant_default = userFilter.data.id_plant;
        }
      });
      if (!users.find(user => user.data.email === userData.data.email)) {
        const userModel = new UserModel();
        userModel.id = userData.id;
        userModel.data.user_name = userData.data.user_name;
        userModel.data.email = userData.data.email;
        userModel.data.name = userData.data.name;
        userModel.data.role = userData.data.role;
        userModel.data.plants = plants;
        userModel.data.id_plant = plant_default;
        userModel.data.id_role = userData.data.id_role;
        users.push(userModel);
      };
    })
    
    let userPlants = {
      plantsString: ''
    }
    users.forEach(user => {
      let plants = ''; 
      user.data.plants.forEach((plant, index) => {
        if (index === 0) {
          plants = plant;
        } else {
          plants = plants + ', ' + plant
        }
      });
      userPlants.plantsString = plants;
      user.data = Object.assign(user.data, userPlants);
    });

    users.sort((a, b)=>{
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    })
    this.dataSource.data = users;
    this.isLoading = false;
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

  getUsersPlants(){
    this.users = [];
    this.createUserPromises();
    return Promise.all(this.userPromises);
  }

  createUserPromises(){
    this.userPromises = [];
    this.userPlants.forEach(plant => {
      this.userPromises.push(new Promise(resolve => {
        this.userService.getAll(plant.id_plant).subscribe(
                (responseModel: ResponseModel) => {
                  if (responseModel.data.response.length > 0) {
                    const users = [];
                    responseModel.data.response.forEach((userData) => {
                      const userModel = new UserModel();
                      userModel.id = userData.id;
                      userModel.data.user_name = userData.user_name;
                      userModel.data.email = userData.email;
                      userModel.data.name = userData.name;
                      userModel.data.role = userData.role;
                      userModel.data.id_plant = userData.id_plant;
                      userModel.data.id_role = userData.id_role;
                      userModel.data.plant_status = userData.plant_status;
                      users.push(userModel);
                    });
                    resolve(users);
                  }else{
                    resolve([]);
                  }
                });
      }));
    });
  }

  openFormDialog(userModel?: UserModel) {
    this.dialog.open(UserFormComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: {
        roles: this.Roles,
        userData: userModel,
        plants: this.userPlants
      },
    }).afterClosed().subscribe(result => {
      if (result === undefined) {
        this.loadUsers();
      }
    });
  }

  async deleteRow(userModel: UserModel) {
    let error = false;
    const deleteUserPlants = [];
    this.userService.update(userModel, 'delete').subscribe(
      () => {
          this.showMessage('El usuario ' + userModel.data.name + ' se ha eliminado correctamente', 'error-snackbar');
          this.loadUsers();
      },
      (err) => {
        this.showMessage('Error de conexión', 'error-snackbar');
      }
    );

    await new Promise((resolve) => {
      this.authenticationService.getUserPlants(userModel.data.email)
      .subscribe((responseModel: ResponseModel)=>{
        if (responseModel.data.response.length > 0) {
          responseModel.data.response.forEach(plant => {
            deleteUserPlants.push(plant.id_plant);
          });
          resolve(true);
        } else {
          this.userPlants = []
          resolve(true);
        }
      })
    });

    deleteUserPlants.forEach((deletePlant) => {
      const userPlant = new UserModel();
      userPlant.id = userModel.id;
      userPlant.data.email = userModel.data.email;
      userPlant.data.id_plant = deletePlant;
      userPlant.data.status = 2;
      this.userService.updateUserPlant(userPlant)
      .subscribe(
        () => {},
        (err) => {
          error = true;
        },
      )
    })
    if (error) {
      this.showMessage('Error de conexión', 'error-snackbar');
    }
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  print() {
    window.print();
  }

}
