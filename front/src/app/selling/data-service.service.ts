import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

	  private messageSource = new BehaviorSubject('a`m best of the best');
	  currentMessage = this.messageSource.asObservable();

	  private good = new Subject();
	  currentGood = this.good.asObservable();

	  private summ = new BehaviorSubject(0);
	  currentsumm = this.summ.asObservable();

    private findGood = new Subject();
    curentFindGood = this.findGood.asObservable();

  constructor() { }

   changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeGood(message: any) {
    this.good.next(message)
  }
  
  changeSumm(message: number) {
    this.summ.next(message)
  }

  setFindGood(message: any){
    this.findGood.next(message)
  }
}
