// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject, ChangeDetectorRef, OnChanges, AfterViewInit, AfterContentInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
// import {DialogData} from '../DataDialog';
@Component({
  selector: 'app-modal-list-good',
  templateUrl: './modal-list-good.component.html',
  styleUrls: ['./modal-list-good.component.sass']
})
export class ModalListGoodComponent implements OnInit {
		displayedColumns: string[] = ['ID_PARCEL', 'name', 'barcode', 'price_sell_sum', 'quants'];
		dataSource:object = [
  		 // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  		];
  constructor(public dialogRef: MatDialogRef<ModalListGoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cdRef : ChangeDetectorRef) { }

  ngOnInit() {
  	console.log('data in dialog',this.data)
  	this.dataSource = this.data;

  }
  getRecord(row){
  	console.log(row)
  	this.dialogRef.close(row);
  }

}
