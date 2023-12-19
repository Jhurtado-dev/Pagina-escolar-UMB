import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class RoleServices {

  constructor(private http: HttpClient) { }

  private basePath = '/api/roles';

    getAll(){
    return this.http.get(`${environment.host}${this.basePath}/getAll/`)
  }

}
