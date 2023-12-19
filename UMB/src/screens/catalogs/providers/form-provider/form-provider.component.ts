import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderModel } from 'src/models/provider.model';
import { ProvidersService } from 'src/services/providers.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['../../style-catalogs.scss'],
})
export class FormProviderComponent implements OnInit {
  providerModel: ProviderModel = new ProviderModel();
  nameFormContrl = new FormControl('', [Validators.required]);
  title = 'Nuevo';

  providerForm = new FormGroup({
    name: this.nameFormContrl,
  });

  constructor(
    public dialogRef: MatDialogRef<FormProviderComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private providersService: ProvidersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.data.providerData !== undefined) {
      this.providerModel = this.data.providerData;
      this.title = 'Actualizar';
      this.loadProviderData();
    }
  }

  loadProviderData() {
    this.providerForm.setValue({
      name: this.providerModel.data.name,
    });
  }

  addOrUpdate() {
    this.providerModel.data.name = this.providerForm.value.name;
    if (this.data.providerData !== undefined) {
      this.providersService.update(this.providerModel).subscribe(
        () => {
          this.showMessage('El proveedor ' + this.providerModel.data.name + ' se actualizó correctamente', 'success-snackbar');
          this.dialogRef.close();
        },
        (err) => {
          if (err.error.data !== undefined) {
            this.showMessage('El proveedor ya existe', 'error-snackbar');
          } else {
            this.showMessage('Error de conexión', 'error-snackbar');
          }
        },
      );
    } else {
      this.providersService.create(this.providerModel).subscribe(
        () => {
          this.showMessage('El proveedor ' + this.providerModel.data.name + ' se creó correctamente', 'success-snackbar');
          this.dialogRef.close();
        },
        (err) => {
          if (err.error.data !== undefined) {
            this.showMessage('El proveedor ya existe', 'error-snackbar');
          } else {
            this.showMessage('Error de conexión', 'error-snackbar');
          }
        },
      );
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
