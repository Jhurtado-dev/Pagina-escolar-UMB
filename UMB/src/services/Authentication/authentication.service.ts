import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  private basePath = '/api/users';

  login(email:string,password:string){
    return this.http.get(`${environment.host}${this.basePath}/signin/${email}&${password}`)
  }

  getUserPlants(email:String){
    return this.http.get(`${environment.host}${this.basePath}/getUserPlants/${email}`)
  }
}
