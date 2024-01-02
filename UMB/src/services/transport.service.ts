import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionModel } from 'src/models/session.model';
import { TransportModel } from 'src/models/transport.model';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http:HttpClient) { }
  private path = `${environment.host}/api/users/student`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private userName = this.sessionData.user.data.user_name;
  private idUser = this.sessionData.user.id;
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };


  getGrades(){
   const idUser = this.sessionData.user.data.id_user;
    return this.http.get(`${this.path}/info?userId=${idUser}`, this.httpOptions);
  }

  getSchedule(){
    const idUser = this.sessionData.user.data.id_user;
     return this.http.get(`${this.path}/schedule?userId=${idUser}`, this.httpOptions);
   }
}
