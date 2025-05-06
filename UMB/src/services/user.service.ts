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
    return this.http.get(`${this.basePath}/student/allstudent`, this.httpOptions);
  }
  getAllTeachers(idPlant?:string) {
    return this.http.get(`${this.basePath}/getAllTeachers`, this.httpOptions);
  }

  create(userModel: UserModel) {
    userModel.data.id_user = this.sessionData.user.data.id_user;
    return this.http.post(`${this.basePath}/create`, userModel.data, this.httpOptions);
  }

  getClassId(idClass:number){
     return this.http.get(`${this.basePath}/getClassId?idClass=${idClass}`, this.httpOptions);
   }

   getAllClass(){
    return this.http.get(`${this.basePath}/getClass`, this.httpOptions);
  }


  delete(id_user) {
    return this.http.delete(`${this.basePath}/student/delete/${id_user}`, this.httpOptions);
  }
  

  createUserPlant(userModel: UserModel) {
    userModel.data.user_name = this.sessionData.user.data.user_name;
    return this.http.post(`${this.basePath}/create/userPlant`, userModel.data, this.httpOptions);
  }
  updateUserPlant(userModel: UserModel) {
    userModel.data.user_name = this.sessionData.user.data.user_name;
    return this.http.put(`${this.basePath}/update/userPlant/${userModel.id}`, userModel.data, this.httpOptions);
  }
  updateStudentInfo(id_user: number, name: string, last_name: string, phone: string, id_group:number) {
    const data = {
      id_user: id_user,
      name: name,
      last_name: last_name,
      phone: phone,
      id_group: id_group
    };
    return this.http.put(`${this.basePath}/updatestudentinfo`, data, this.httpOptions);
  }

  createStudent(name: number, last_name: string, birth_date: string, phone: string, email:number,id_group:number, user_name:string, password:string, id_class:number) {
    const data = {
      name: name,
      last_name: last_name,
      birth_date: birth_date,
      phone: phone,
      email: email,
      id_group:id_group,
      user_name:user_name,
      password:password,
      id_class:id_class
    };
    
    return this.http.put(`${this.basePath}/createsStudent`, data, this.httpOptions);
  }

  createTeacher(name: number, last_name: string, birth_date: string, phone: string, email:number,id_group:number, user_name:string, password:string) {
    const data = {
      name: name,
      last_name: last_name,
      birth_date: birth_date,
      phone: phone,
      email: email,
      id_group:id_group,
      user_name:user_name,
      password:password
    };
    
    return this.http.put(`${this.basePath}/createsTeacher`, data, this.httpOptions);
  }
}
