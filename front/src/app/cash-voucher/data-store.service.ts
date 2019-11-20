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
}
