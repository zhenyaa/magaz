import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
import  {InterForModalLabel} from './edit-doc/DataDialog'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MAPIService {

  constructor(private http: HttpClient) { }
API_URL  =  environment.baseUrl;
  CreateNew(user){
  	const body = {name: user.name, age: user.age}; 
  	return this.http.post(this.API_URL + "/incdoc/", body)
  }

  ReadDocsInc(){
  	return this.http.get(this.API_URL+ '/incdocs/')
  }

  ReadGood(barcode){
  	return this.http.get(this.API_URL+ '/good/'+ barcode)
  }

  CreateInc(data:object){
  	console.log(data)
  	const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  	return this.http.post(this.API_URL+ '/incomin/', {test:[data]}, {headers: headers})
  }

  ReadMarkup(id){
  	return this.http.get(this.API_URL+ '/markup/'+ id)
  }

  ReadDocGood(id){
  	return this.http.get(this.API_URL+ '/incomin/'+ id)
  }

  DeleteInc(id){
  	 return this.http.delete(this.API_URL+'/incomin/' +id)
  	// return this.http.delete(`${this.API_URL}/incomin/${id}`);
  }

  DeleteIncDoc(id){
  	// return this.http.delete(this.API_URL+ '/incdocs/', elem)
  	return this.http.delete(`${this.API_URL}/incdoc/${id}`);
  }

  UpdateStatus(id, status1){
    console.log("its status",status1)
  return this.http.put(this.API_URL+'/incdoc/',
    {},
    { params: { id: id, status: status1 }}
    ) 
  }

  PrintLabel(data){
    const body = {label: data};
    return this.http.post(this.API_URL+'/label/', body, { responseType: 'blob' })
  }

  UpdateElem(data){
    return this.http.patch(this.API_URL + '/incomin/' + data.incId, { params: { elem: data}})
  }
  
  


}
