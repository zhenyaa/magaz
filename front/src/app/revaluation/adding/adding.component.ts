import { Component, OnInit, Output, EventEmitter, OnChanges, OnDestroy, AfterContentChecked} from '@angular/core';
import { ApiService} from '../api.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DataService} from '../data.service'
import {ModalComponent} from '../modal/modal.component'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.sass']
})
export class AddingComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked { 
  /*
  Компонент отоброжения выбора елемента
  */

	@Output() increment: EventEmitter<string> = new EventEmitter<string>();
  sub: Subscription;
  constructor(private service: ApiService, private dialog: MatDialog, private dataStore: DataService) { 
    }

name:string = null
parcel: number= null
barcode: number= null
docId:any = null

  ngOnInit() {
    // this.sub = this.dataStore.curDocId.subscribe((value)=>{
    //   console.log('test subs curdocid', value);
    //   this.docId = value;
    // })
  }

  ngOnChanges() {
      
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
  ngAfterContentChecked() {
    this.sub = this.dataStore.curDocId.subscribe((value)=>{
      console.log('test subs curdocid', value);
      this.docId = value;
    })
       
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
           const dialogRef = this.dialog.open(ModalComponent, {
           width: '50%',
           disableClose: true,
           data: {good: data}
         });

         dialogRef.afterClosed().subscribe(result => {
           if (result == ''){
             console.log('result is null', result);
             }
           else{
              this.service.CreateNewElem(data, result, this.docId).subscribe((res)=>{
              console.log(res);
                  }) 
              }
                       
           });
  }
}
