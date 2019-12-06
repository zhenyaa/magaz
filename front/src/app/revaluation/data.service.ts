import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, ReplaySubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  // for list of revaluation object
  private ravalList: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public getRavalList(): BehaviorSubject<any[]> {
    return this.ravalList;
  }

  public setRavalList(newRevalList: any[]): void {
    this.ravalList.next(newRevalList);
  }

  // its id document
  private documentID: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public getDocumentID(): BehaviorSubject<any[]> {
    return this.documentID;
  }

  public setDocumentID(newDocumentID: any[]): void {
  	console.log('test datastore elemid',newDocumentID);
    this.documentID.next(newDocumentID);
  }




  // public appendToState(newItem: any): void {
  //   this.state.next([...this.state.getValue(), newItem]);
  

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

private outTableStatus = new Subject();
curOutTableStatus = this.outTableStatus.asObservable();

setOutTableStatus(msg){
	this.outTableStatus.next(msg)
}

}
