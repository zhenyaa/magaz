import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CdkRow} from '@angular/cdk/table';

// import { QuantityGoodsComponent } from './quantity-goods/quantity-goods.component';
@Component({
  selector: 'app-select-goods',
  templateUrl: './select-goods.component.html',
  styleUrls: ['./select-goods.component.css']
})
export class SelectGoodsComponent implements OnInit {


  constructor() { }
  ngOnInit() {
  }
  private subject = new BehaviorSubject("test");
  public dataTest:Array<Object> = [
    {id:1, barcode: 223355, name: "kitkat", cost: 34},
    {id:8, barcode: 223356, name: "snikers", cost: 37},
    {id:3, barcode: 223357, name: "baunty", cost: 33},
    {id:4, barcode: 223358, name: "nats", cost: 35},
    {id:5, barcode: 223358, name: "nats", cost: 35},
    {id:6, barcode: 223358, name: "nats", cost: 35},
    {id:7, barcode: 223358, name: "nats", cost: 35},
    {id:8, barcode: 223358, name: "nats", cost: 35},
    {id:9, barcode: 223358, name: "nats", cost: 35},
    {id:12, barcode: 223358, name: "nats", cost: 35},
    {id:13, barcode: 223358, name: "nats", cost: 35},
    {id:14, barcode: 223358, name: "nats", cost: 35},
    {id:15, barcode: 223358, name: "nats", cost: 35},
    {id:16, barcode: 223358, name: "nats", cost: 35},
    {id:17, barcode: 223358, name: "nats", cost: 35},
    {id:18, barcode: 223358, name: "nats", cost: 35},
    {id:19, barcode: 223358, name: "nats", cost: 35},
    {id:20, barcode: 223358, name: "nats", cost: 35},
    {id:21, barcode: 223358, name: "nats", cost: 35},
    {id:22, barcode: 223358, name: "nats", cost: 35},
    {id:23, barcode: 223358, name: "nats", cost: 35},
    {id:24, barcode: 223358, name: "nats", cost: 35},
    {id:25, barcode: 223358, name: "nats", cost: 35}
  ];

  test(data){
    this.subject.next(data)
  }
}
