import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from  '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { throwError } from 'rxjs'
 import {GetVoucher, Voucher} from './voucher'

 import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  API_URL  =  environment.baseUrl;

  readVoucher(getDate:GetVoucher): Observable<Voucher>{
  	return this.http.get<Voucher>(this.API_URL+"/voucher/",{params: new HttpParams().set('getStartDate', getDate.dateStart).set('getEndDate', getDate.dateEnd)}
  	 )
  }
  
}
