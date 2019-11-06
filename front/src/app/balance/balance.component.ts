import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation } from '@angular/core';
import {APIService} from './api.service'
import { MatTableDataSource } from '@angular/material';
interface requsteBalance {
	barcode:number
	parcel:number
	qunt:number

}
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BalanceComponent implements OnInit {
// encapsulation: ViewEncapsulation.None
openADDWiew:boolean= false;
balanceR:requsteBalance ={
	barcode:null,
	parcel:null,
	qunt:5
}
dataSource = new MatTableDataSource<any>();
dataTable ={};

  constructor(private service: APIService) { }

  ngOnInit() {
  	// this.getBalance()
  }

  getBalance(){
  	console.log(this.balanceR);
  	this.service.ReadBalance(this.balanceR.barcode, this.balanceR.parcel, this.balanceR.qunt).subscribe((res:any)=>{
  		console.log(res);
  		this.dataSource.data = res;
  	})
  }

    openAddWive(){
  	console.log(this.openADDWiew);
  	this.openADDWiew = this.openADDWiew != true;
  }

  balanceDataChange(event){
  	console.log('its parent balance data',event);
  	this.dataSource.data = event;
  }

}
