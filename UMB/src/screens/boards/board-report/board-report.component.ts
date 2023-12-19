import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/models/session.model';

@Component({
  selector: 'app-board-report',
  templateUrl: './board-report.component.html',
  styleUrls: ['./board-report.component.scss']
})
export class BoardReportComponent implements OnInit {

  selected = 0;

  constructor() { }

  ngOnInit(): void {
    const tapselection = localStorage.getItem('tapSelectionReport');
    if (tapselection != null) {
      this.selected = parseInt(tapselection);
    }
  }

  changeTab(selected) {
    localStorage.setItem('tapSelectionReport', JSON.stringify(selected));
}

}
