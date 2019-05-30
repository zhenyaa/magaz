import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-choice-list',
  templateUrl: './choice-list.component.html',
  styleUrls: ['./choice-list.component.scss']
})
export class ChoiceListComponent implements OnInit {
public  Goods:  Array<object> = [
// {"barcode": 223244, "name": "huy", "quantyti": 2},
// {"barcode": 223245, "name": "huy2", "quantyti": 2},
// {"barcode": 223246, "name": "huy3", "quantyti": 2},
// {"barcode": 223247, "name": "huy4", "quantyti": 2},
];
quantity:any;
  message: any;
    subscription: Subscription;
  constructor(private dataService: DataService ) { 
  	this.subscription = this.dataService.getMessage().subscribe(message => { 
      this.Goods = this.Goods.concat(message)
      console.log(message, this.Goods)
  	});
  }

  ngOnInit() {
  }

  addToEndList(good){
  	// var caunt = prompt( ("Ведите количество "+ this.model.get("name")),0);
//         this.model.set("quantity",caunt);
	this.quantity = prompt(("Введите количество для "+ good.name) ,"1")
  good.quantity = this.quantity
  	this.dataService.addToEndList(good)
  	this.Goods = []
  }

}
