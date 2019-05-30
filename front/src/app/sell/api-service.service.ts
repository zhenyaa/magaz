import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from  '@angular/common/http';
import {ChangeSum} from './user-model'
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
API_URL  =  'http://localhost:5000';

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

  ReadGood(barcode){
  	return this.http.get(this.API_URL+"/stock/", 
  		{params: new HttpParams().set('barcode', barcode)}
  		)
  }

  CreateNewСashVoucher(voucher: ChangeSum){
  	console.log("PUT");
  	let url = `${this.API_URL}/voucher/`;
  	let search = new URLSearchParams();
  	search.set('foo', 'moo');
  	search.set('data', "test");
  	this.http.post(url, {moo:"foo",data:voucher}).subscribe(res => console.log(res));
}
  	}



  	//   CreateNewСashVoucher(voucher: ChangeSum){
  	// let headers = new Headers();
  	// headers.append('Content-Type', 'application/json');
  	// console.log('api service', voucher);
  	// return this.http
  	// .put(this.API_URL+"/voucher/", JSON.stringify(voucher))
  	// }




