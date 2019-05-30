import { Component, OnInit } from '@angular/core';
import {GoodApiService} from './good-api.service'
import {RouteRoutingModule} from './route-routing.module'
import {Router} from '@angular/router';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {
GoodList = {}

  constructor(private service: GoodApiService, private route :Router ) { }

  ngOnInit() {
  	this.readGoods()
  }

  displayedColumns: string[] = ['id','name','barcode', 'grup', 'actions', 'delete'];
  dataSource:object = [
  // {name: 'ПН-001', date:'24.02.2018', summ:'2534.00', inpay: true},
  
  ];


  readGoods(){
  	this.service.Read("/goods").subscribe((res) =>{
  		console.log(res);
  		this.dataSource = res['goods'];
  		// console.log(this.)
  	})
  }

  editElement(good){
  	console.log(good)
  	this.route.navigate(['editgood', good.id]);

  }
  
}
