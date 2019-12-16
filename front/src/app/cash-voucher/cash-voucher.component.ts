import { Component, OnInit } from '@angular/core';
import {DataStoreService} from './data-store.service'
@Component({
  selector: 'app-cash-voucher',
  templateUrl: './cash-voucher.component.html',
  styleUrls: ['./cash-voucher.component.sass']
})
export class CashVoucherComponent implements OnInit {

  constructor( private dataStore : DataStoreService) { }
  vaucherId

  ngOnInit() {
  	this.dataStore.getVoucherId().subscribe(res=>{this.vaucherId = res});
  	console.log(this.vaucherId);
  }


  

}
