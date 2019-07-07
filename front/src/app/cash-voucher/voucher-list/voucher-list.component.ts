import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Voucher, tableVoucher} from '../voucher' 
import {DataStoreService} from '../data-store.service'
@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.sass']
})
export class VoucherListComponent implements OnInit {

  constructor(private dataStore : DataStoreService) { }
  dataSource = new MatTableDataSource<tableVoucher>();

  ngOnInit() {
  	 this.dataStore.curVoucher.subscribe((res:any)=>{
  	 	console.log('res in subs',res);
  		this.dataSource.data = res
  	})
  	 

  }

  displayedColumns: string[] = ['docName', 'time', 'quant', 'summ', 'nal', 'change', 'typePay'];
  transactions = [
   
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource.data.map((t) => t["quant_velem"]).reduce((acc, value) => acc + value, 0);
  }

  getTypeOfPay(tyPy:Voucher){
  	console.log('typay',tyPy);
  	if (tyPy.type_pay == 0) {
  		return "Наличный"
  	}
  	else{
  		return "Безналичный"
  	}
  }

  getTotalCost1() {
    return this.dataSource.data.map(t => t["amount_price_sum"]).reduce((acc, value) => acc + value, 0);
  }
  getTotalCost2() {
    return this.dataSource.data.map(t => t["amount_customer_sum"]).reduce((acc, value) => acc + value, 0);
  }
  getTotalCost3() {
    return this.dataSource.data.map(t => t["amount_customer_change"]).reduce((acc, value) => acc + value, 0);
  }

}
