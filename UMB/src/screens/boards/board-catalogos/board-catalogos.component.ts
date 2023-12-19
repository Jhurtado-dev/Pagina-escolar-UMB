import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/models/session.model';

@Component({
  selector: 'app-board-catalogos',
  templateUrl: './board-catalogos.component.html',
  styleUrls: ['./board-catalogos.component.scss']
})
export class BoardCatalogosComponent implements OnInit {

  constructor() { }

  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private idPlant = this.sessionData.user.data.id_plant;
  enable = true;

  ngOnInit(): void {
    this.validPlant();
  }

  validPlant(){
    if(this.idPlant === 'CHA' || this.idPlant === 'ACE'){
      this.enable = false;
    } else {
      this.enable = true;
    }
  }
}
