import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ModalListGoodComponent} from '../modal-list-good/modal-list-good.component'
import {ModalQuantGoodComponent} from '../modal-quant-good/modal-quant-good.component'
import {ApiServiceService} from '../api-service.service'
import {DataStoreService} from '../data-store.service'
import {UserModel} from '../user-model';
@Component({
  selector: 'app-find-good',
  templateUrl: './find-good.component.html',
  styleUrls: ['./find-good.component.sass']
})
export class FindGoodComponent implements OnInit {
@ViewChild('search') searchElement: ElementRef;
findFild = null;
  constructor(private dialog: MatDialog, 
  	private service: ApiServiceService,
  	private dataStore : DataStoreService,
  	) { }

  ngOnInit() {
  }
  GetGood(){
  	this.service.ReadGood(this.findFild).subscribe((res)=>{
  		console.log(res);
  		this.OpenDialogForChangeGood(res);
  	})

  }

  OpenDialogForChangeGood(dataGood){
  	  const dialogRef = this.dialog.open(ModalListGoodComponent, {
           width: '90%',
           disableClose: true,
           data: dataGood,
         });

         dialogRef.afterClosed().subscribe((result:UserModel) => {
            if (result.ID_PARCEL) {
				this.OpenDialogForChangeQuant(<UserModel>result)           
            }
         },
         err=>{
         	console.log(err)
         });
  	}

  showSearch(){
  // this.show = !this.show;  
  setTimeout(()=>{ // this will make the execution after the above boolean has changed
    this.searchElement.nativeElement.focus();
  },0);  
}

  OpenDialogForChangeQuant(goodObj){
  	  const dialogRef = this.dialog.open(ModalQuantGoodComponent, {
           width: '50%',
           disableClose: true,
           data: goodObj,
         });

         dialogRef.afterClosed().subscribe((result:UserModel) => {
         	console.log(result);
         	if (result.ID_PARCEL) {
            	this.dataStore.changeMessage(result);
         	}
         });
         this.findFild=null;
         this.showSearch();
  	}

}
