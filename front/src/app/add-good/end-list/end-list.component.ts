import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Subscription } from 'rxjs';
import {AddGoodService} from '../add-good.service';
@Component({
  selector: 'app-end-list',
  templateUrl: './end-list.component.html',
  styleUrls: ['./end-list.component.scss']
})
export class EndListComponent implements OnInit {
public  Goods:  Array<object> = [
// {"barcode": 223248, "name": "huy5", "quantyti": 2},
// {"barcode": 223249, "name": "huy6", "quantyti": 2},
];
message: any;
subscription: Subscription;
  constructor(private dataService: DataService, private service: AddGoodService) { 
  	this.subscription = this.dataService.getGoodFromEndLIst().subscribe(message => {this.Goods.push(message['text'])
  		console.log('its message',message)
      console.log('its end goods list',this.Goods)
  	})
  }

  ngOnInit() {
  }

  delGood(good){
    this.Goods = this.Goods.filter(item => item !== good);
  }

  sendToServer(){
this.service.CreateGoods(this.Goods).subscribe(
  res =>{
    console.log(res)
  },
  err =>{alert("Ошибка отправки данных")
  console.log(err)
}
  )

  }

}
