import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/Authentication/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.setAuthListener();
  }

  setAuthListener() {
    const authenticate = this.storageService.isAuthenticated();

    if (authenticate) {
      if (this.router.url === '/login' || this.router.url === '/') {
        this.router.navigate(['/emicelio']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

}
