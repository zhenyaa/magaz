import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import {GetVoucher} from '../voucher'
import {APIService} from '../api.service'
import {DataStoreService} from '../data-store.service'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.sass']
})
export class ControlComponent implements OnInit {
 
 get_voucher:GetVoucher ={
  dateStart:new Date().toDateString(),
  dateEnd:new Date().toDateString(),
};
  constructor(private service: APIService, private dataStore : DataStoreService) { }

  ngOnInit() {
    let d = new Date()
    d.setDate(d.getDate() + 1);
   this.get_voucher.dateEnd = d.toDateString()
   console.log(this.get_voucher);
   this.service.readVoucher(this.get_voucher).subscribe((res)=>{
     this.dataStore.changeMessage(res);
   })

  }

  dpicker1(type: string, event: MatDatepickerInputEvent<Date>) {
    this.get_voucher.dateStart = event.value.toDateString();
    }

  dpicker2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.get_voucher.dateEnd = event.value.toDateString();
    console.log(this.get_voucher);
    }

  userRangeDate(){
    this.service.readVoucher(this.get_voucher).subscribe((res)=>{
     this.dataStore.changeMessage(res);
   })

  }

}
