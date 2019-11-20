import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  API_URL  =  environment.baseUrl;

  ReadDocsRev(){
  	return this.http.get(this.API_URL+ '/rev/')
  }

  ReadDocElem(id){
  	return this.http.get(this.API_URL+ "/relem/" + id)
  }

  CreateNewDoc(){
  	return this.http.post(this.API_URL+ '/rev/', {text:'newDoc'})
  }

  DeleteDoc(id){
  	return this.http.delete(this.API_URL+ '/rev/',  { params: { sessionId: id}})
  }

  ReadStockElem(name, part, barcode){
  	return this.http.get(this.API_URL + '/stock/', {params: {rname:name, rparcel:part, rbarcode:barcode}})
  }

  CreateNewElem(oldElem, elem, parentID){
    return this.http.post(this.API_URL+ '/relem/', {elem:{old:oldElem, new:elem, parentId:parentID}})
  }
}
