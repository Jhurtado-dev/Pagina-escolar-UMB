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

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./../../style-catalogs.scss']
})
export class ListProviderComponent implements OnInit {

  sessionModel: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  providers: ProviderModel[] = [];
  isLoading = true;

  constructor(
    public dialog: MatDialog,
    private providersService: ProvidersService,
    private snackBar: MatSnackBar,
  ) { }

  dataSource = new MatTableDataSource(this.providers);
  displayedColumns = ['id', 'name', 'edit', 'delete'];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (travel: any, filter: string) => {
      return travel.data.name.toLowerCase().includes(filter);
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Proveedores por vista';
    this.loadProviders();
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadProviders() {
    this.providers = [];
    this.providersService.getAll().subscribe(
      (responseModel: ResponseModel) => {
        if(responseModel.data.response.length > 0){
          responseModel.data.response.forEach(providerData => {
            const providerModel = new ProviderModel();
            providerModel.id = providerData.id;
            providerModel.data.name = providerData.name;
            providerModel.data.status = providerData.status;
            this.providers.push(providerModel);
          });
          this.dataSource.data = this.providers;
          this.isLoading = false;
        }else {
          this.dataSource.data = [];
          this.isLoading = false;
        }
      }
    );
  }

  deleteRow(provider: ProviderModel) {
    this.providersService.update(provider,'delete').subscribe(
      () => {
        this.showMessage('El proveedor ' + provider.data.name + ' se ha eliminado correctamente', 'success-snackbar');
        this.loadProviders();
      },
      (err) => {
        this.showMessage('Error de la base de datos', 'error-snackbar');
      }
    );
  }


  openFormDialog(providerModel?: ProviderModel) {
    this.dialog.open(FormProviderComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: {
        providerData: providerModel
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
