import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {DialogData} from '../DataDialog';
@Component({
  selector: 'app-modal-good-component',
  templateUrl: './modal-good-component.component.html',
  styleUrls: ['./modal-good-component.component.scss']
})
export class ModalGoodComponentComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalGoodComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private cdRef : ChangeDetectorRef) { }
  inputdata:any = {
      id: 0, 
      name:'', 
      barcode:0, 
      grup:'', 
      perentDoc:0, 
      delimeter:0, 
      markup:0,
  };
  public ValidateQuantyty: FormControl;
  public Validate_fractional_number: FormControl;
  public ValidateDelimeter: FormControl;
  public Validate_purchase_cost: FormControl;
  public Validate_cost_price: FormControl;
  ngOnInit() {
    console.log('its data in modal', this.data)
    this.inputdata = this.data;
    this.validatorList();
  }
  ngOnChanges(){
    this.cdRef.detectChanges();
  }
  ngAfterViewInit(){
  this.validatorList();
  }
  ngAfterContentInit(){
    this.validatorList();
  }


  newData = this.data;
  perId = this.newData['perentDoc']
  newGood:DialogData = {
    id:this.data['id'],
    cost:null, 
    quantyty:null, 
    _fractional_number:null, 
    delimeter:this.data['delimeter'], 
    _purchase_cost:1, 
    _cost_price:null,
    _persent:this.data['markup'],
    _perent:this.perId,

     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  costOut(){
    console.log('keyup work', typeof(this.newGood._purchase_cost), typeof(this.newGood._persent), this.data._persent)
    let var1 = (((this.newGood._purchase_cost * this.newGood._persent)) / 100).toFixed(3);
    console.log(var1, 'its var1')
    console.log('its persent',this.newGood._persent)

    this.newGood._cost_price = parseFloat((this.newGood._purchase_cost + parseFloat(var1)).toFixed(2));
    this.cdRef.detectChanges();
  }

  hendPersent(){
    let var1 = (this.newGood._cost_price / this.newGood._purchase_cost) *100-100;
    if (var1 !==NaN){
      // this.newGood._persent = 0;  
      }
    // if (){}
    else{
    this.newGood._persent = var1;
    }
    this.cdRef.detectChanges();
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
