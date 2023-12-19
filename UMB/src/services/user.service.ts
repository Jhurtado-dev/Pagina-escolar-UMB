import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SessionModel } from "src/models/session.model";
import { UserModel } from "src/models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  private basePath = `${environment.host}/api/users`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private idPlant = this.sessionData.user.data.id_plant;
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

  getAll(idPlant?:string) {
    if (idPlant) {
      return this.http.get(`${this.basePath}/getAll/${idPlant}`, this.httpOptions); 
    }else{
      return this.http.get(`${this.basePath}/getAll/${this.idPlant}`, this.httpOptions);
    }
  }

  create(userModel: UserModel) {
    userModel.data.created_by = this.sessionData.user.data.email;

    //Sin despliegue a plantas:
    userModel.data.id_plant = this.sessionData.user.data.id_plant;
    userModel.data.plant = this.sessionData.user.data.plant;
    
    return this.http.post(`${this.basePath}/create`, userModel.data, this.httpOptions);
  }

  update(userModel: UserModel, action?: string) {
    if (action === 'delete') {
      userModel.data.status = 1;
    }
    userModel.data.modified_by = this.sessionData.user.data.email;
    return this.http.put(`${this.basePath}/update/${userModel.id}`, userModel.data, this.httpOptions);
  }

  createUserPlant(userModel: UserModel) {
    userModel.data.created_by = this.sessionData.user.data.email;
    return this.http.post(`${this.basePath}/create/userPlant`, userModel.data, this.httpOptions);
  }
  updateUserPlant(userModel: UserModel) {
    userModel.data.created_by = this.sessionData.user.data.email;
    return this.http.put(`${this.basePath}/update/userPlant/${userModel.id}`, userModel.data, this.httpOptions);
  }
}
