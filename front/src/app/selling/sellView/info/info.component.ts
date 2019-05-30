import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '.././../data-service.service'
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private data:DataServiceService) { }
  summ:number;
  ngOnInit() {
  	this.data.currentsumm.subscribe(message => this.summ = message)
  }

}
