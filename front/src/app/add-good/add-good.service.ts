import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddGoodService {

  constructor(private  httpClient:  HttpClient) { }

  API_URL  =  'http://localhost:5000';

	  ReadGood(param){
	     let params: HttpParams = new HttpParams();
	    Object.keys(param).forEach(function (key) {
	     params = params.append(key, param[key]);
	});
	    return  this.httpClient.get(this.API_URL + `/additem`, {params: {"barcode" : param}});
	}


	CreateGoods(goods){

		return this.httpClient.post(this.API_URL + '/additem/', goods)
	}


}
