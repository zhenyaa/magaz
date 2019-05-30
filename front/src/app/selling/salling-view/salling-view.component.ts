import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DataServiceService} from '../data-service.service'

@Component({
  selector: 'app-salling-view',
  templateUrl: './salling-view.component.html',
  styleUrls: ['./salling-view.component.css']
})
export class SallingViewComponent implements OnInit {
	test:string;
  constructor(private data: DataServiceService) { }
  ngOnInit() {
  	this.data.currentMessage.subscribe(message => this.test = message)
  }

}
