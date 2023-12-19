import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionModel } from 'src/models/session.model';

@Injectable({
  providedIn: 'root'
})

export class PlantsServices {

  constructor(private http: HttpClient) { }
  private path = `${environment.host}/api/shipments`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

    getAll() {
      return this.http.get(`${this.path}/getPlants`, this.httpOptions);
    }
}
