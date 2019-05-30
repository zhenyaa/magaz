import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GoodApiService} from '../good-api.service'

@Component({
  selector: 'app-edit-good',
  templateUrl: './edit-good.component.html',
  styleUrls: ['./edit-good.component.scss']
})
export class EditGoodComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service : GoodApiService) { }
params:any = 0;

editGood:any = {
	barcode:0,
	name:0,
}


  ngOnInit() {
  	 this.params = this.route.snapshot.params;
    console.log(this.params.id);
    this.getGood(this.params.id)
  }


  getGood(id){
  	this.service.Read("/good/"+ id).subscribe((res)=>{
  		console.log(res);
  		this.editGood = res['good'][0];
  		console.log('its edit Good',this.editGood)
  	})
  }
  fixhend(){
  	console.log(this.editGood)
  	this.service.UpdateGood(this.editGood).subscribe((res)=>{
  		console.log(res);
  	})
  }
}
