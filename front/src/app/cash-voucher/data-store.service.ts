import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }

private Voucher = new Subject();
curVoucher = this.Voucher.asObservable();


 changeMessage(message) {
    this.Voucher.next(message)
  }

private voucherID = new BehaviorSubject([]);

public getVoucherId(): BehaviorSubject<any> {
	return this.voucherID;
}

public setVoucherID(newState:any):void {
	this.voucherID.next(newState)
}  


private detailVoucherList = new Subject();

public getVoucherDetail(){
	return this.detailVoucherList;
}

public setVoucherDetail(elemDetail){
	this.detailVoucherList.next(elemDetail)
}

}
