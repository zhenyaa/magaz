import { Component, OnInit , AfterContentChecked} from '@angular/core';
import { DataStoreService } from '../data-store.service'
import { APIService } from '../api.service'
@Component({
  selector: 'app-detail-voucher',
  templateUrl: './detail-voucher.component.html',
  styleUrls: ['./detail-voucher.component.sass']
})
export class DetailVoucherComponent implements OnInit, AfterContentChecked {

  constructor(private dataStore: DataStoreService, private api: APIService) { }
dataSours
  ngOnInit() {
    
  	this.dataSours = this.dataStore.getVoucherDetail()
  	console.log(this.dataSours.value);
  }
  ngAfterContentChecked(){
  	// this.api.readDetailVoucher()
  }

}
