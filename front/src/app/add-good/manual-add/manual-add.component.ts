import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manual-add',
  templateUrl: './manual-add.component.html',
  styleUrls: ['./manual-add.component.scss']
})
export class ManualAddComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  barcode = "";
  name = "";
  quantity = "";

  newGood = {barcode: 0, 
  name:"", 
  quantity: 0,};

  add(){
  	console.log("work", this.newGood)
  	this.dataService.addToEndList(this.newGood)
    this.newGood = {barcode: 0, name:"", quantity: 0};
  }

}
