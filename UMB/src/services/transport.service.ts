import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionModel } from 'src/models/session.model';
import { TransportModel } from 'src/models/transport.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http:HttpClient) { }
  private path = `${environment.host}/api/transport`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private idPlant = this.sessionData.user.data.id_plant;
  private userName = this.sessionData.user.data.user_name;
  private idUser = this.sessionData.user.id;
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

  createTransport(trasnportModel : TransportModel){
    trasnportModel.data.created_by = this.userName;
    trasnportModel.data.id_plant =this.idPlant;
    return this.http.post(`${this.path}/createTransport`, trasnportModel.data, this.httpOptions);
  }

  getTransport(){
    return this.http.get(`${this.path}/getTransport`, this.httpOptions);
  }
}
