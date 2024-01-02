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
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

  getAll(idPlant?:string) {
  
  }

  create(userModel: UserModel) {
    userModel.data.id_user = this.sessionData.user.data.id_user;

    return this.http.post(`${this.basePath}/create`, userModel.data, this.httpOptions);
  }

  update(userModel: UserModel, action?: string) {
    if (action === 'delete') {
    }
    userModel.data.user_name = this.sessionData.user.data.user_name;
    return this.http.put(`${this.basePath}/update/${userModel.id}`, userModel.data, this.httpOptions);
  }

  createUserPlant(userModel: UserModel) {
    userModel.data.user_name = this.sessionData.user.data.user_name;
    return this.http.post(`${this.basePath}/create/userPlant`, userModel.data, this.httpOptions);
  }
  updateUserPlant(userModel: UserModel) {
    userModel.data.user_name = this.sessionData.user.data.user_name;
    return this.http.put(`${this.basePath}/update/userPlant/${userModel.id}`, userModel.data, this.httpOptions);
  }
}
