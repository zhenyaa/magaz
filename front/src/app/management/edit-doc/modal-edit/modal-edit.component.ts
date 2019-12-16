import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {InterForModalLabel} from '../DataDialog';
@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.sass']
})
export class ModalEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cdRef : ChangeDetectorRef) { }

  public ValidateQuantyty: FormControl;
  public Validate_fractional_number: FormControl;
  public ValidateDelimeter: FormControl;
  public Validate_purchase_cost: FormControl;
  public Validate_cost_price: FormControl;

  ngOnInit() {
  	console.log('its data in modal edit', this.data)
    // this.inputdata = this.data;
    this.validatorList();
  }

   validatorList(){
    this.ValidateQuantyty = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[1-9][0-9]*$") //need valid for quantity
    ]);
    this.Validate_fractional_number = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[0-9][0-9]*$")
    ]);
    this.ValidateDelimeter = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[1-9][0-9]*$")
    ]);
    this.Validate_purchase_cost = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")
    ]);
     this.Validate_cost_price = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")
    ]);
  }

}
