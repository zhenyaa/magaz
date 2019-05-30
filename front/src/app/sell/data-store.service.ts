import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

import {UserModel, ChangeSum} from './user-model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }


	private TObj = new Subject<UserModel>();
	curtest = this.TObj.asObservable();

	private Summ = new Subject<number>();
	currentSumm = this.Summ.asObservable();

	private FormatedToSendObj = new Subject<ChangeSum>();
	currentSendObj = this.FormatedToSendObj.asObservable();

 changeMessage(message: UserModel) {
    this.TObj.next(message)
  }

 changeSumm(summ:number){
  	this.Summ.next(summ)
  }

 changeSendObj(data: ChangeSum){
 	this.FormatedToSendObj.next(data)
 }




}
