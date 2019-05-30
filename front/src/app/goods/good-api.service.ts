import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoodApiService {

  constructor(private  httpClient:  HttpClient) { }

  API_URL  =  'http://localhost:5000';

  Read(url){
  	return this.httpClient.get(this.API_URL + url)
  }

  Create(){

  }

  Update(){

  }

  Delete(){
  }

  ReadNewGood(barcode){
  	return this.httpClient.get(this.API_URL + '/newgood/'+barcode)
  }

  CreateNewGood(data){
  	return this.httpClient.post(this.API_URL + '/newgood/', {newgood: data})
  }

  UpdateGood(data){
  	const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  	return this.httpClient.put(this.API_URL + '/good/', data, {headers: headers})
  }
}
