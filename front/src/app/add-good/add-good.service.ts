import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddGoodService {

  constructor(private  httpClient:  HttpClient) { }

  API_URL  =  environment.baseUrl;

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
