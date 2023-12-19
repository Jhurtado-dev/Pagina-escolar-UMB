import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../../services/Authentication/storage.service';
import { filter } from 'rxjs/operators';
import { SessionModel } from 'src/models/session.model';


@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {

  sessionModel: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  enable = true;
  isHome = false;
  viewRoute = '';

  Roles = [];

  date = new Date();
  fecha;

  fillerNav = [
    { icon: 'nature', name: 'Registro de tarimas', route: 'home' },
    { icon: 'assessment', name: 'Reportes', route: 'reportes' },
    { icon: 'menu_book', name: 'Catálogos', route: 'catalogos' },
  ];

 
  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      this.isHome = this.router.url.split('/', 5).length === 3;
    });
    this.changeViewNamw('');
  }

  loadData() {
    this.isHome = (this.router.url === '/emicelio/home' || this.router.url === '/emicelio/reportes' || this.router.url === '/emicelio/catalogos');
  }



  goBack() {
    const arrayRouteName = this.router.url.split('/');
    let linkRoute = 'emicelio/';

    switch (arrayRouteName.length) {
      case 4: linkRoute += arrayRouteName[2];
        break;

      case 5:

        if (arrayRouteName[3] === 'formulacion' || arrayRouteName[3] === 'premojado' || arrayRouteName[3] === 'bunker' || arrayRouteName[3] === 'tunnels' || arrayRouteName[4] === 'historical' || arrayRouteName[3] === 'llenado' || arrayRouteName[3] === 'incubación' || arrayRouteName[3] === 'coverHouse' || arrayRouteName[3] === 'incubacion' || arrayRouteName[3] === 'barrido' || arrayRouteName[3] === 'cut' || arrayRouteName[3] === 'emptied' || arrayRouteName[3] === 'burnedHouse') {
          linkRoute += arrayRouteName[2];
        }
        else if (arrayRouteName[3] === 'historical') {
          linkRoute += arrayRouteName[2] + '/' + arrayRouteName[4];
        } 
        else if (arrayRouteName[2] === 'reportes' && arrayRouteName[3] === 'cultivo-corte') {
          linkRoute += arrayRouteName[2];
        }

        break;

      case 7:
        if (arrayRouteName[3] === 'siembra' && arrayRouteName[5] === 'historical') {
          linkRoute += arrayRouteName[2] + '/' + 'tunnels' + '/' + arrayRouteName[5];
        }
        if (arrayRouteName[3] === 'forecastTule') {
          linkRoute += arrayRouteName[2] + '/' + 'cut' + '/' + arrayRouteName[4];

        }
        break;
      case 8:
        if (arrayRouteName[4] === 'fancom') {
          linkRoute += arrayRouteName[2] + '/' + arrayRouteName[3] + '/' + arrayRouteName[5];
        }
        if (arrayRouteName[3] === 'llenado' && arrayRouteName[5] === 'transporte') {
          linkRoute += arrayRouteName[2] + '/' + arrayRouteName[3] + '/' + arrayRouteName[4];
        }
      case 9:
        if (arrayRouteName[4] === 'real' && arrayRouteName[6] === 'transporte') {
          linkRoute += arrayRouteName[2] + '/' + arrayRouteName[3] + '/' + arrayRouteName[4] + '/' + arrayRouteName[5];
        }

    }
    this.router.navigate([linkRoute]);
  }

  public logout() {
    this.storageService.logout();
  }

  changeViewNamw(route) {
    let moduleTitle = '';
      moduleTitle = 'Registro de Tarimas';
    if (route === '') {
      const nameurl = this.router.url.split('/');
      route = nameurl[2];
    }
    switch (true) {
      case route.includes('home'): this.viewRoute = moduleTitle;
        break;

      case route.includes('registrodetarimas'): this.viewRoute = 'Registro de tarimas';
        break;

      case route.includes('catalogos'): this.viewRoute = 'Catálogos';
        break;

      case route.includes('reportes'): this.viewRoute = 'Reportes';
        break;
    }
  }

}
