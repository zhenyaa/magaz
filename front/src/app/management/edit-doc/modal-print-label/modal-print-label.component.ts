import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {InterForModalLabel} from '../DataDialog';
@Component({
  selector: 'app-modal-print-label',
  templateUrl: './modal-print-label.component.html',
  styleUrls: ['./modal-print-label.component.sass']
})
export class ModalPrintLabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalPrintLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterForModalLabel, private cdRef : ChangeDetectorRef) { }
newData
  ngOnInit() {
  	this.newData = this.data;
  	this.newData.map((ob) =>{
  		ob.QUANT_LABEL = ob.quantity
  	})
  	console.log('modal data', this.data);
  	this.dataSource = this.newData;
  }

  displayColumn :string[] = ['id','name', 'cost', 'QUANT'];
  dataSource:object = [
  		// {id: 'ПН-001',name:"test", barcode:'22548', grup:'testGrup'},
  ];

}
