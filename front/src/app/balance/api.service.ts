import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }
  API_URL  =  environment.baseUrl;

  ReadBalance(barcode, parcel, qunt,){
  	return this.http.get(this.API_URL + '/balance/', {params: {bbarcode:barcode, bparcel:parcel, bqunt:qunt}})
  }
}
