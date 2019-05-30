import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataServiceService} from '.././../data-service.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-good',
  templateUrl: './list-good.component.html',
  styleUrls: ['./list-good.component.css']
})
export class ListGoodComponent implements OnInit {
sub: Subscription;
  constructor(private data :DataServiceService ) { }

  ngOnInit() {
    this.sub = this.data.curentFindGood.subscribe(message => { 
      console.log(message)

        this.dataTest = this.dataTest.concat(message)
        console.log(this.dataTest)
      })
  }

   public dataTest:Array<Object> = [

  ];
  test(data){
  	console.log(data);
  	this.data.changeGood(data);
  }

  ngOnDestroy() {
  this.sub.unsubscribe();
}
}
