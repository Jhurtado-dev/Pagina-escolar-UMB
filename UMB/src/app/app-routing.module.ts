import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/screens/login/login.component';
import { AuthorizatedGuard } from '../services/Authentication/authorizated.service';
import { MainComponent } from 'src/main/main.component';
import { MainBoardComponent } from '../screens/main-board/main-board.component';
import { BoardCatalogosComponent } from 'src/screens/boards/board-catalogos/board-catalogos.component';
import { BoardReportComponent } from 'src/screens/boards/board-report/board-report.component'
import { ReceptionShipmentsComponent } from 'src/screens/reception-shipments/reception-shipments.component';
import { UserListComponent } from 'src/screens/catalogs/users/user-list/user-list.component';
import { ListProviderComponent } from 'src/screens/catalogs/providers/list-provider/list-provider.component';
import { RegisterPalletComponent } from 'src/screens/register-pallet/register-pallet.component';
const routes: Routes = [
  { path: '' , component: MainComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login' , component: LoginComponent},
  {
    path: 'emicelio' , component: MainBoardComponent,

    
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // Boards
      { path: 'home' , component: ReceptionShipmentsComponent},
      {path:'pallet',component:RegisterPalletComponent},
      { path: 'catalogos' , component: BoardCatalogosComponent},
      { path: 'reportes' , component: BoardReportComponent},
         // Catalogs
         { path: 'catalogos/users', component: UserListComponent},
         { path: 'catalogos/provedores', component: ListProviderComponent},


    ], canActivate: [ AuthorizatedGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
