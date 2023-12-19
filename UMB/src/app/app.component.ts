import { Component } from '@angular/core';
import { AuthenticationService } from '../services/Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthenticationService ]
})
export class AppComponent {
  constructor(){
  }
}
