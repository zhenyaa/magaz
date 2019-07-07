import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataStoreService} from '../data-store.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import {ApiServiceService} from '../api-service.service'
import {UserModel, NewSetSum, ChangeSum} from '../user-model';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
	  displayedColumns: string[] = [
	  'position', 
	  'name', 
	  'weight', 
	  'weight2', 
	  'symbol', 
	  'cost'
	  ];
	  subscription: Subscription;
	  subOnSendObj: Subscription;
	  dataSource = new MatTableDataSource<any>();
  constructor(private dataStore: DataStoreService, private service: ApiServiceService,) { }

  ngOnInit() {
  	this.subs();
  	this.subsOnSendObject();
  	//this.calcSum();
  }

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  	this.subOnSendObj.unsubscribe();
  }

  subs(){
  	this.subscription = this.dataStore.curtest.subscribe((message: UserModel) =>{ 
  		console.log('SH_C subs data', message);
  		let d = this.calcTotalSumForGood(message);
  		message.newSum = <NewSetSum>{newSumFloat: d};
        this.dataSource.data = this.dataSource.data.concat(message);
        this.calcSum()
      },
      err=>{
      	console.log(err)
      })

  }

  subsOnSendObject(){
  	this.subOnSendObj = this.dataStore.currentSendObj.subscribe((res: ChangeSum)=>{
  		console.log(res);
  		res.listOfProduct= this.dataSource.data;
  		console.log(res);
  		this.service.CreateNewСashVoucher(res).subscribe((res)=>{
        console.log("its response from server");
        // console.log(res)
        if (res == "OK") {
          console.log("server send ok");
          this.dataSource.data = [];
          this.calcSum()
        }
      });
  	})

  }



  calcSum(){
  	this.dataStore.changeSumm(this.dataSource.data.reduce((summ:number, v:UserModel) => summ += v.newSum.newSumFloat, 0))
  	// return this.dataSource.data.reduce((summ:number, v:UserModel) => summ += v.newSum.newSumFloat, 0)
  	// console.log('tesе calculate' ,element)
  }

  calcTotalSumForGood(data: UserModel){
  	let sumFOR_INT = data.price_sell_sum * data.newQuant.qant_int;
  	let sumFOR_FLOAT = ((data.price_sell_sum / data.quant_div) * data.newQuant.quant_div)% data.price_sell_sum;
  	return Number((sumFOR_INT + sumFOR_FLOAT).toFixed(2));
  }

}
