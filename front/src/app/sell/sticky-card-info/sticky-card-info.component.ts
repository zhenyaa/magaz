import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataStoreService} from '../data-store.service'
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ApiServiceService} from '../api-service.service'
import {UserModel, NewSetQuant, ChangeSum} from '../user-model';
import {ModalForCalcChangeComponent} from '../modal-for-calc-change/modal-for-calc-change.component'
@Component({
  selector: 'app-sticky-card-info',
  templateUrl: './sticky-card-info.component.html',
  styleUrls: ['./sticky-card-info.component.sass']
})
export class StickyCardInfoComponent implements OnInit {

  constructor(private dataStore: DataStoreService,
  	private dialog: MatDialog, 
  	private service: ApiServiceService,
  	) { }
 	subscription: Subscription;
 	SummOfPAy: ChangeSum={
 		priceSum:0,
 		typeOfPay:0
 		 	}

  ngOnInit() {
  	this.subscription = this.dataStore.currentSumm.subscribe((res:number)=>{
  		this.SummOfPAy.priceSum = res;
  		})
  	}

  ngOnDestroy()	{
  	this.subscription.unsubscribe()
  	}

  payFunc(){
  	this.OpenDialogForChangeQuant(this.SummOfPAy)
  }


  OpenDialogForChangeQuant(goodObj){
  	  const dialogRef = this.dialog.open(ModalForCalcChangeComponent, {
           width: '40%',
           disableClose: true,
           data: goodObj,
         });

         dialogRef.afterClosed().subscribe((result:ChangeSum) => {
         	console.log('afterClose' , result);
         	if (result.priceSum) {
         		console.log("work dialog for change", result);
            	this.dataStore.changeSendObj(result);
         	}
         });
       
  	}

}
