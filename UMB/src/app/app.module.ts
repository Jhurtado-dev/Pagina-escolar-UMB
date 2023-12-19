import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule, } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from 'src/screens/login/login.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


//boards
import { BoardReportComponent } from 'src/screens/boards/board-report/board-report.component';
import { BoardCatalogosComponent } from 'src/screens/boards/board-catalogos/board-catalogos.component';
import { FormProviderComponent } from 'src/screens/catalogs/providers/form-provider/form-provider.component';
import { ListProviderComponent } from 'src/screens/catalogs/providers/list-provider/list-provider.component';
import { UserFormComponent } from 'src/screens/catalogs/users/user-form/user-form.component';
import { UserListComponent } from 'src/screens/catalogs/users/user-list/user-list.component';
import { MainBoardComponent } from 'src/screens/main-board/main-board.component';


import { AppComponent } from './app.component';
import { MainComponent } from 'src/main/main.component';
import { StorageService } from 'src/services/Authentication/storage.service';
import { AuthorizatedGuard } from 'src/services/Authentication/authorizated.service';
import { ReceptionShipmentsComponent } from 'src/screens/reception-shipments/reception-shipments.component';
import { RegisterPalletComponent } from 'src/screens/register-pallet/register-pallet.component';
import { AuthenticationService } from 'src/services/Authentication/authentication.service';
import { LandingModule } from 'src/screens/landingPage/landing/landing.module';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    MainBoardComponent,
    UserListComponent,
    UserFormComponent,
    BoardCatalogosComponent,
    ListProviderComponent,
    FormProviderComponent,
    BoardReportComponent,

    ReceptionShipmentsComponent,
    RegisterPalletComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSortModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatTooltipModule,
    MatSortModule,
    MatTabsModule,
    ChartsModule,
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    LandingModule

    
  ],
  providers: [
    StorageService,
    AuthorizatedGuard,
    AuthenticationService,
    HttpClient,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  ],
  })
export class AppModule { }