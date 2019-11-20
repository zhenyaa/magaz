import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, ReplaySubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

// private Voucher = new Subject();
// curVoucher = this.Voucher.asObservable();


//  changeMessage(message) {
//     this.Voucher.next(message)
//   }


private DocId = new ReplaySubject(1);
curDocId = this.DocId.asObservable();

changeDocID(message) {
   this.DocId.next(message)
  }

private dataSourceContent = new ReplaySubject(1);
curDataSourceContent = this.dataSourceContent.asObservable();

setDataSourse(data){
	this.dataSourceContent.next(data)
}

getDataSourse(){
	return this.curDataSourceContent
}


}
