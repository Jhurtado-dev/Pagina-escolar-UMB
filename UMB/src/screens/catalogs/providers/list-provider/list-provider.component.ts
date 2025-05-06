import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProviderModel } from 'src/models/provider.model';
import { ProvidersService } from 'src/services/providers.service';
import { FormProviderComponent } from '../form-provider/form-provider.component';
import { ResponseModel } from 'src/models/response.model';
import { SessionModel } from 'src/models/session.model';
import { UserService } from 'src/services/user.service';
import { UserModel } from 'src/models/user.model';
import { RoleModel } from 'src/models/role.model';
import { RoleServices } from 'src/services/role.service';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./../../style-catalogs.scss']
})
export class ListProviderComponent implements OnInit {

  sessionModel: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  teachers: UserModel[] = [];
  Groups = [];
  isLoading = true;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private roleServices: RoleServices,
    private snackBar: MatSnackBar,
  ) { }

  dataSource = new MatTableDataSource(this.teachers);
  displayedColumns = ['id', 'user' , 'name', 'group', 'phone', 'edit','delete'];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (travel: any, filter: string) => {
      return travel.data.name.toLowerCase().includes(filter);
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Maestros por vista';
    this.loadProviders();
    this.loadGroups();
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
            console.log(this.Groups);
          });
        }
      }
    );
  }
  

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadProviders() {
    this.teachers = [];
    this.userService.getAllTeachers().subscribe(
      (responseModel: ResponseModel) => {
        console.log(responseModel.data.response.userData);
        
        if(responseModel.data.response.userData.length > 0){
        const teachers = responseModel.data.response
        this.dataSource =teachers.userData; 
        console.log(this.dataSource);
        
        }else {
          this.dataSource.data = [];
          this.isLoading = false;
        }
      }
    );
  }

  deleteRow(id_user) {
    let error = false;
    this.userService.delete(id_user).subscribe(
      () => {
          this.showMessage('El usuario se ha eliminado correctamente', 'success-snackbar');
          this.loadProviders();
      },
      (err) => {
        console.error(err);
        this.showMessage('Error de conexión', 'error-snackbar');
      }
    );
  
  }


  openFormDialog(teacherModel?: UserModel) {
    this.dialog.open(FormProviderComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: {
        groups:this.Groups,
        userData: teacherModel
      },
    }).afterClosed().subscribe(result => {
      if (result === undefined) {
        this.loadProviders();
      }
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

  print() {
    window.print();
  }

}
