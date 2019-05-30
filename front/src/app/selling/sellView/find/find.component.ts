import { Component, OnInit, Input } from '@angular/core';
import {DataServiceService} from '.././../data-service.service'
import {ApiService} from '.././../api.service'
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
	findFild: string;
  constructor(private data : DataServiceService, private service : ApiService ) { }

  ngOnInit() {
  }

  sendBarcode(){
  	console.log(this.findFild);
    return this.service.ReadGood(this.findFild).subscribe((res)=>{
      console.log(res);
      this.data.setFindGood(res);
    })
  	this.data.changeMessage(this.findFild);
  }
}
