import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '.././../data-service.service'
@Component({
  selector: 'app-paylist',
  templateUrl: './paylist.component.html',
  styleUrls: ['./paylist.component.css']
})
export class PaylistComponent implements OnInit {

  constructor(private data:DataServiceService) { }

  ngOnInit() {
  	this.data.currentGood.subscribe(message => 	{	this.dataTest.push(message)
  	 	this.runchengeDet()})
  }
     public dataTest:Array<Object> = [
    // {id:1, barcode: 223355, name: "kitkat", cost: 34},
  ];

  runchengeDet(){
  	let summ = this.dataTest.reduce((acc, pilot) => acc + pilot["price_sell_sum"], 0);
  	this.data.changeSumm(summ);
  }
  test(data){
  	console.log(data);
  	// this.dataTest.pop(data);
  	const index: number = this.dataTest.indexOf(data);
    if (index !== -1) {
        this.dataTest.splice(index, 1);
    }  
    this.runchengeDet();
  }

}
