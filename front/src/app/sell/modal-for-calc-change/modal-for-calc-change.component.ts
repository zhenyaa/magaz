import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {UserModel, NewSetQuant, ChangeSum} from '../user-model';
@Component({
  selector: 'app-modal-for-calc-change',
  templateUrl: './modal-for-calc-change.component.html',
  styleUrls: ['./modal-for-calc-change.component.sass']
})
export class ModalForCalcChangeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalForCalcChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeSum, private cdRef : ChangeDetectorRef) { }

 newPayData:ChangeSum= {
 	typeOfPay:0
 }

  ngOnInit() {
  	console.log(this.data);
  	this.newPayData = this.data;
  	this.newPayData.typeOfPay=0;
  	this.newPayData.customerChange=0;
  	console.log(this.newPayData);
  }


  calcCustometSum(){
  	// console.log(this.newPayData);
  	this.newPayData.customerChange = Number((this.newPayData.customerSum - this.newPayData.priceSum).toFixed(2));
  	return this.newPayData.customerChange;
  }
  addToPayList(){
  	console.log("woork pay button");
  	this.dialogRef.close(this.newPayData);

  }

}
