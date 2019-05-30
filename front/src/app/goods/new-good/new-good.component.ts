import { Component, OnInit } from '@angular/core';
import {GoodApiService} from '../good-api.service';
@Component({
  selector: 'app-new-good',
  templateUrl: './new-good.component.html',
  styleUrls: ['./new-good.component.scss']
})
export class NewGoodComponent implements OnInit {
newGood:object = [];
newGoodHend = {
	barcode:0,
	name:'',
};
findBarcodeStr = ''

  constructor(private service: GoodApiService) { }

  ngOnInit() {
  }
findBarcode(){
	console.log(this.findBarcodeStr)
	this.service.ReadNewGood(this.findBarcodeStr).subscribe((res: any)=>{
		console.log(res)
		this.newGood = res.goodName;
		this.findBarcodeStr = '';
	})
}

createNewGood(itemgood){
	console.log(itemgood)
	this.service.CreateNewGood(itemgood).subscribe((res)=>{
		console.log(res);
		alert("Добавлено " + res['name'])
	})
}

addhend(){
console.log(this.newGoodHend);
this.service.CreateNewGood(this.newGoodHend).subscribe((res)=>{
	console.log(res);
	alert("Добавлено " + res['name'])
})
}
  
}
