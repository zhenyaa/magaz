import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
import { of } from 'rxjs';
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private dataStore: DataService) { }
  API_URL  =  environment.baseUrl;

  ReadDocsRev(){
  	return this.http.get(this.API_URL+ '/rev/')
  }

  ReadDocElem(): void {
    let id = this.dataStore.getDocumentID().value
    console.log(id);
  	this.http.get(this.API_URL+ "/relem/" + id).subscribe((res:any)=>{
      this.dataStore.setRavalList(res);
    })
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

  DelateRevalGood(id:number){
    return this.http.delete(this.API_URL + '/relem/' + id)
  }

  useRevaluation(id:number){
    return this.http.patch(this.API_URL + '/rev/'+ id, { params: { status: 'True'}})
  }


 testData = [
  {
    "ID_PARCEL": 1829, 
    "barcode": 4015001002843, 
    "id": 425, 
    "name": "\u041a\u0420\u0415\u041c-\u041a\u0420\u0410\u0421\u041a\u0410 PALETTE PERFECT CARE 909 \u0418\u0421\u0421\u0418\u041d\u042f", 
    "price_sell_sum": 72.0, 
    "quant_div": 1, 
    "quant_float": 1.0, 
    "quant_int": 1, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 1830, 
    "barcode": 4605966014731, 
    "id": 426, 
    "name": "PALETTE C6 \u0445\u043e\u043b\u043e\u0434\u043d\u044b\u0439 \u0441\u0440\u0435\u0434\u043d\u0435  \u0440\u0443\u0441\u044b\u0439 ", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }]

  getMOchData1(){
    return [
  {
    "ID_PARCEL": 1829, 
    "barcode": 4015001002843, 
    "id": 425, 
    "name": "\u041a\u0420\u0415\u041c-\u041a\u0420\u0410\u0421\u041a\u0410 PALETTE PERFECT CARE 909 \u0418\u0421\u0421\u0418\u041d\u042f", 
    "price_sell_sum": 72.0, 
    "quant_div": 1, 
    "quant_float": 1.0, 
    "quant_int": 1, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 1830, 
    "barcode": 4605966014731, 
    "id": 426, 
    "name": "PALETTE C6 \u0445\u043e\u043b\u043e\u0434\u043d\u044b\u0439 \u0441\u0440\u0435\u0434\u043d\u0435  \u0440\u0443\u0441\u044b\u0439 ", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 1831, 
    "barcode": 3838905551610, 
    "id": 427, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 N7 \u0420\u0423\u0421\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 1.0, 
    "quant_int": 1, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 1832, 
    "barcode": 3838824048536, 
    "id": 428, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 RF3 \u041a\u0420\u0410\u0421\u041d\u042b\u0419 \u0413\u0420\u0410\u041d\u0410\u0422", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 1.0, 
    "quant_int": 1, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 481, 
    "barcode": 4015100187649, 
    "id": 575, 
    "name": "PALETTE BW10 \u0424\u0410\u0420\u0411\u0410 \u0414/\u0412 \u041f\u0423\u0414\u0420 \u0411\u041b\u041e\u041d\u0414", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 5.0, 
    "quant_int": 5, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 484, 
    "barcode": 3838905551559, 
    "id": 578, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 N1 \u0427\u0415\u0420\u041d\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 5.0, 
    "quant_int": 5, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 485, 
    "barcode": 3838824087245, 
    "id": 579, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 WN3 \u0417\u041e\u041b\u041e\u0422\u0418\u0421\u0422\u042b\u0419 \u041a\u041e\u0424\u0415", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 486, 
    "barcode": 3838824023564, 
    "id": 580, 
    "name": "PALETTE ICC \u041a\u0420\u0410\u0421\u041a\u0410 \u0414/\u0412\u041e\u041b\u041e\u0421 RI5 \u041e\u0413\u041d\u0415\u041d\u041d\u041e-\u041a\u0420\u0410\u0421\u041d\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 487, 
    "barcode": 3838905551566, 
    "id": 581, 
    "name": "PALETTE ICC \u041a\u0420\u0410\u0421\u041a\u0410 \u0414/\u0412\u041e\u041b\u041e\u0421 N2 \u0422\u0401\u041c\u041d\u041e-\u041a\u0410\u0428\u0422\u0410\u041d\u041e\u0412\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 488, 
    "barcode": 3838905551573, 
    "id": 582, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 N3 \u041a\u0410\u0428\u0422\u0410\u041d\u041e\u0412\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 4.0, 
    "quant_int": 4, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 489, 
    "barcode": 4015100209594, 
    "id": 583, 
    "name": "PALETTE ICC 5-46 \u0433\u043b\u044f\u043d\u0446\u0435\u0432\u044b\u0439 \u043a\u0430\u0448\u0442\u0430\u043d\u043e\u0432\u044b\u0439", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 3.0, 
    "quant_int": 3, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 491, 
    "barcode": 4605966014755, 
    "id": 585, 
    "name": "PALETTE ICC \u041a\u0420\u0410\u0421\u041a\u0410 \u0414/\u0412\u041e\u041b\u041e\u0421 W2 \u0422\u0415\u041c\u041d\u042b\u0419 \u0428\u041e\u041a\u041e\u041b\u0410\u0414", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 3.0, 
    "quant_int": 3, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 492, 
    "barcode": 3178041320559, 
    "id": 586, 
    "name": "PALETTE KN5 \u0424\u0410\u0420\u0411\u0410 \u0414/\u0412 \u041a\u041b\u0423\u0411\u041d \u041a\u0410\u0428\u0422\u0410\u041d", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 4.0, 
    "quant_int": 4, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 493, 
    "barcode": 3178041320535, 
    "id": 587, 
    "name": "PALETTE GK4 \u0424\u0410\u0420\u0411\u0410 \u0414/\u0412", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 3.0, 
    "quant_int": 3, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 494, 
    "barcode": 3838905551603, 
    "id": 588, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 N6 \u0421\u0420\u0415\u0414\u041d\u0415-\u0420\u0423\u0421\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 495, 
    "barcode": 4045787463835, 
    "id": 589, 
    "name": "PALETTE 7-560 \u0431\u0440\u043e\u043d\u0437\u043e\u0432\u044b\u0439 \u0448\u043e\u043a\u043e\u043b\u0430\u0434\u043d\u044b\u0439", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 4.0, 
    "quant_int": 4, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 496, 
    "barcode": 3838905551719, 
    "id": 590, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 RFE3 \u0411\u0410\u041a\u041b\u0410\u0416\u0410\u041d", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 3.0, 
    "quant_int": 3, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 497, 
    "barcode": 3838905551696, 
    "id": 591, 
    "name": "PALETTE ICC \u041a\u0420\u0410\u0421\u041a\u0410 \u0414/\u0412\u041e\u041b\u041e\u0421 R4 \u041a\u0410\u0428\u0422\u0410\u041d", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 3.0, 
    "quant_int": 3, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 498, 
    "barcode": 3838905551597, 
    "id": 592, 
    "name": "PALETTE \u041a\u0420\u0410\u0421\u041a\u0410 N5 \u0422\u0415\u041c\u041d\u041e-\u0420\u0423\u0421\u042b\u0419", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 1.0, 
    "quant_int": 1, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 499, 
    "barcode": 4015100209600, 
    "id": 593, 
    "name": "PALETTE 6-79 \u043a\u0430\u0448\u0442\u0430\u043d\u043e\u0432\u044b\u0439 \u0442\u0435\u0440\u0440\u0430\u043a\u043e\u0442\u043e\u0432\u044b\u0439", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 501, 
    "barcode": 3178041320542, 
    "id": 595, 
    "name": "PALETTE CK6 \u0424\u0410\u0420\u0411\u0410 \u0414/\u0412 \u0422\u0415\u041f\u041b \u041a\u0410\u0428\u0422\u0410\u041d", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 4.0, 
    "quant_int": 4, 
    "quant_num": 0
  }, 
  {
    "ID_PARCEL": 503, 
    "barcode": 4015100203776, 
    "id": 597, 
    "name": " PALETTE8-140 \u043f\u0435\u0441\u043e\u0447\u043d\u044b\u0439 \u0440\u0443\u0441\u044b\u0439", 
    "price_sell_sum": 49.0, 
    "quant_div": 1, 
    "quant_float": 2.0, 
    "quant_int": 2, 
    "quant_num": 0
  }]
  }
}
