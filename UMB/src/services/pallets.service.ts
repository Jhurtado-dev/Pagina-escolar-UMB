import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionModel } from 'src/models/session.model';
import { PalletModel } from 'src/models/pallet.model';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PalletsService {
  private path = `${environment.host}/api/shipments`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private idPlant = this.sessionData.user.data.id_plant;
  private userName = this.sessionData.user.data.user_name;
  private idUser = this.sessionData.user.id;
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

  getPallet() {
    return this.http.get(`${this.path}/getPallet`, this.httpOptions);
  }

  getBoxes() {
    return this.http.get(`${this.path}/getBoxes`, this.httpOptions);
  }

  getSku() {
    return this.http.get(`${this.path}/getSku`, this.httpOptions);
  }

  createPallet(palletModel: PalletModel, formGroup: FormGroup) {
    palletModel.data.created_by = this.userName;

    return this.http.post(`${this.path}/createPallet`, palletModel.data, this.httpOptions)
      .pipe(
        tap(() => {
          this.resetForm(formGroup);
        })
      );
  }

  resetForm(formGroup: FormGroup) {
    formGroup.reset();
  }

  constructor(private http: HttpClient) { }

}
