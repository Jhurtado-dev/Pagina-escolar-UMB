import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { ProviderModel } from 'src/models/provider.model';
import { SessionModel } from 'src/models/session.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

  private basePath = `${environment.host}/api/provider`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

  getAll() {
    return this.http.get(`${this.basePath}/getAll/`, this.httpOptions);
  }

  create(providerModel: ProviderModel){
    providerModel.data.created_by = this.sessionData.user.data.role_name;
    return this.http.post(`${this.basePath}/`, providerModel.data, this.httpOptions);
  }

  update(providerModel: ProviderModel, action?: string){
    if (action === 'delete') {
      providerModel.data.status = 1;
    }
    providerModel.data.modified_by = this.sessionData.user.data.role_name;
    return this.http.put(`${this.basePath}/update/${providerModel.id}`, providerModel.data, this.httpOptions);
  }
}
