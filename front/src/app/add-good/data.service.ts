import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 private subject = new Subject<any>();

    sendMessage(message: object) {
    	console.log(message)
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }



    private addGood = new Subject<any>();

    addToEndList(message: object) {
        this.addGood.next({ text: message });
    }

    clearFromEndList() {
        this.addGood.next();
    }

    getGoodFromEndLIst(): Observable<any> {
        return this.addGood.asObservable();
    }

}
