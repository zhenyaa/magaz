import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
API_URL  =  'http://localhost:5000';

  ReadGood(barcode){
  	return this.http.get(this.API_URL+"/stock/", 
  		{params: new HttpParams().set('barcode', barcode)}
  		)
  	}
  
}
