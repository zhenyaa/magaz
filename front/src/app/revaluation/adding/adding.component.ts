import { Component, OnInit, Output, EventEmitter, OnChanges, OnDestroy, AfterContentChecked} from '@angular/core';
import { ApiService} from '../api.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {DataService} from '../data.service'
import {ModalComponent} from '../modal/modal.component'
import { Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';


@Injectable()
export class StorageService {
  private state: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public getState(): BehaviorSubject<any[]> {
    return this.state;
  }

  public setState(newState: any[]): void {
    this.state.next(newState);
  }

  // public appendToState(newItem: any): void {
  //   this.state.next([...this.state.getValue(), newItem]);
  // }

}

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
  constructor(private service: ApiService, 
              private dialog: MatDialog, 
              private dataStore: DataService,  
              private storageService: StorageService) { 
    }

name:string = null
parcel: number= null
barcode: number= null
docId:any = null

  ngOnInit() {
     this.storageService.getState().subscribe(res => {
      this.dataSours = res;
    });
  }

  ngOnChanges() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
  ngAfterContentChecked() {
    this.sub = this.dataStore.getDocumentID().subscribe((value)=>{
      this.docId = value;
    })
    }
  
  displayedColumns: string[] = ['parcel', 'name', 'cost', 'quantity'];
  dataSours = [];

  getStockElem(){
  	console.log(this.name, this.parcel, this.barcode);
    this.service.ReadStockElem(this.name, this.parcel, this.barcode).subscribe((res:any)=>{
      this.storageService.setState(res);
    });
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

          dialogRef.afterClosed().pipe(
            filter(Boolean),
            switchMap(result => this.service.CreateNewElem(data, result, this.docId))
            ).subscribe(result => {
              this.service.ReadDocElem()
          });
  }
}
