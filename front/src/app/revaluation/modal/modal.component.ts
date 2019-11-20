import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
// import {DialogData} from '../DataDialog';


export class RevData {
	public newCostStr: string;
	public percentStr: string;
	public newCostNum: number;
	public percentNum: number;
	constructor(newCostStr: string, percentStr: string ){
		this.newCostStr = newCostStr;
		this.percentStr = percentStr;
	}
	calcPercent(oldCost){
		this.percentNum = Number(Number(this.newCostStr)/ Number(oldCost)*100 - 100);
		this.percentStr = String(this.percentNum.toFixed(2))
	}
	calcCost(oldCost){
		this.newCostNum = Number(oldCost) + ((Number(oldCost) / 100) * Number(this.percentStr))
		this.newCostStr = String(this.newCostNum.toFixed(2))
	}
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  /*
  Модал для изменения цены
  */

  constructor( public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cdRef : ChangeDetectorRef) { }

  public ValidateCost: FormControl;
  public ValidatePercent: FormControl;
 

  ngOnInit() {
  	console.log('its modal revaluation ',this.data);
  	this.validatorList();
  }

  newData = new RevData('', '')
  submit(){
  	console.log("subm work", this.newData);
  }

  doSomething($event){
  	console.log(event);
  	console.log(this.newData);
  	this.newData.calcPercent(this.data.good.price_sell_sum);
  }

  eventChanePercent(){
  	this.newData.calcCost(this.data.good.price_sell_sum);

  }

  validatorList(){
    this.ValidateCost = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[1-9][0-9]*$") //need valid for quantity
    ]);
    this.ValidatePercent = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[0-9][0-9]*$")
    ]);
   
  }
 

}
