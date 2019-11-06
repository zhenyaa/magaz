import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {APIService} from '../api.service'
@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.sass'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddingComponent implements OnInit {
@Output() balanceData: EventEmitter<any> = new EventEmitter<any>();

name:string = null
parcel: number = null
barcode: number = null
balanceQuant: number = 15

  constructor(private service: APIService) { }

  ngOnInit() {
  }

 getStockElem(){
 	console.log('Adding get stock');
 	this.service.ReadBalance(this.barcode, this.parcel, this.balanceQuant).subscribe((res)=>{
 		console.log(res);
 		this.balanceData.next(res);
 	})
 }

}
