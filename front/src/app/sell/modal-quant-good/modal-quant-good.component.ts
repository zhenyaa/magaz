import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {UserModel, NewSetQuant} from '../user-model';

@Component({
  selector: 'app-modal-quant-good',
  templateUrl: './modal-quant-good.component.html',
  styleUrls: ['./modal-quant-good.component.sass']
})
export class ModalQuantGoodComponent implements OnInit {
	public ValidateQuantyty: FormControl;
	public Validate_fractional_number: FormControl;
payGoodQuant:NewSetQuant = {
	qant_int:1,
	quant_div:0
}	
outdata:UserModel;


  constructor(public dialogRef: MatDialogRef<ModalQuantGoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel, private cdRef : ChangeDetectorRef) { }

  ngOnInit() {
  	 this.validatorList();
  }
  ngAfterViewInit(){
  	this.cdRef.detectChanges();
  	// this.validatorList();
  }

  addToPayList(){
  	this.outdata = this.data;
  	this.outdata.newQuant = this.payGoodQuant;
  	this.dialogRef.close(this.outdata);
  }

  validatorList(){
    this.ValidateQuantyty = new FormControl('', [
    Validators.required,
    Validators.max(this.data.quant_int),
    Validators.minLength(1),
    Validators.pattern("^[0-9][0-9]*$") //need valid for quantity
    ]);
    
    this.Validate_fractional_number = new FormControl('', [
    Validators.required,
    Validators.max(this.data.quant_div - 1),
    Validators.min(0),
    Validators.minLength(0),
    Validators.pattern("^[0-9][0-9]*$")
    ]);
  }

  somethingChanged(){
  	console.log('changed', this.payGoodQuant);
  	console.log(this.Validate_fractional_number);
  }

}
