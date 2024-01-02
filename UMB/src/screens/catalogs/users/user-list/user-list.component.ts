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
    
  }

}
