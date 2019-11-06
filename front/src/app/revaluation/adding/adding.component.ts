import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ApiService} from '../api.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ModalComponent} from '../modal/modal.component'
@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.sass']
})
export class AddingComponent implements OnInit {

	@Output() increment: EventEmitter<string> = new EventEmitter<string>();

  constructor(private service: ApiService, private dialog: MatDialog,) { }

name:string = null
parcel: number= null
barcode: number= null

  ngOnInit() {
  }
  displayedColumns: string[] = ['parcel', 'name', 'cost', 'quantity'];
  dataSours = [];

  getStockElem(){
  	console.log(this.name, this.parcel, this.barcode);
  	this.service.ReadStockElem(this.name, this.parcel, this.barcode).subscribe((res:any)=>{
  		console.log(res);
  		this.dataSours = res;
  	})
  }

  openModal(row){
  	console.log('modal func open',row);
  	this.modalFuncOpen(row)

  }

  modalFuncOpen(data){
  	console.log(data);

            const dialogRef = this.dialog.open(ModalComponent, {
           width: '50%',
           disableClose: true,
           data: {good: data}
         });

         dialogRef.afterClosed().subscribe(result => {
            console.log(111);
			console.log('its result',result);           
         });
  }
}
