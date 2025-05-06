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
import { ClassModel } from 'src/models/class.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../style-catalogs.scss']
})
export class UserListComponent implements OnInit {

  sessionModel: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  Groups = [];
  Class = [];

  users: UserModel[] = [];
  userPlants = [];
  dataSource = new MatTableDataSource(this.users);
  displayedColumns = ['id', 'user' , 'name', 'group', 'phone', 'edit','delete'];
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
    this.getAllStudent();
    this.loadGroups();
    this.loadClass();
  }

  loadGroups() {
    this.Groups = [];
    this.roleServices.getAll().subscribe(
      (responseModel: ResponseModel ) => {
        if(responseModel.data.response.groups.length > 0){
          responseModel.data.response.groups.forEach(roleData => {
            const groupModel = new RoleModel();
            groupModel.id = roleData.id_group;
            groupModel.data.group_name = roleData.group_name ;
            this.Groups.push(groupModel);
          });
        }
      }
    );
  }

  loadClass(){
    this.Class = [];
    this.userService.getAllClass().subscribe(
      (responseModel: ResponseModel ) => {
        if(responseModel.data.response.classes.length > 0){
          responseModel.data.response.classes.forEach(classData => {
            const classModel = new ClassModel();
            classModel.id = classData.id_class;
            classModel.data.id_teacher = classData.id_teacher,
            classModel.data.id_schedule = classData.id_schedule,
            classModel.data.status= classData.status,
            classModel.data.created_at= classData.created_at,
            classModel.data.modified_at= classData.modified_at,
            classModel.data.created_by= classData.created_by,
            classModel.data.modified_by=classData.modified_by 
            this.Class.push(classModel);
          });
          
        }
      }
    );
  }

  openFormDialog(userModel?: UserModel) {
    this.dialog.open(UserFormComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: {
        groups: this.Groups,
        classes:this.Class,
        userData: userModel,
      },
    }).afterClosed().subscribe(result => {
      if (result === undefined) {
        this.getAllStudent();
      }
    });
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  deleteRow(id_user) {
    let error = false;
    this.userService.delete(id_user).subscribe(
      () => {
          this.showMessage('El usuario se ha eliminado correctamente', 'success-snackbar');
          this.getAllStudent();
      },
      (err) => {
        console.error(err);
        this.showMessage('Error de conexión', 'error-snackbar');
      }
    );
  
  }
  

  getAllStudent(){
    this.userService.getAll().subscribe(
      (resposeModel:ResponseModel)=>{
        const users = resposeModel.data.response;
        this.dataSource = users.userData;
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
}
