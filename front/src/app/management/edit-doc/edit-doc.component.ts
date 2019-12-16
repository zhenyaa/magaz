import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import {MAPIService} from '../m-api.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ModalGoodComponentComponent} from './modal-good-component/modal-good-component.component'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { timeout } from 'rxjs/operators';
import {ModalPrintLabelComponent} from './modal-print-label/modal-print-label.component';
import { ModalEditComponent} from './modal-edit/modal-edit.component'
import { filter, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-doc',
  templateUrl: './edit-doc.component.html',
  styleUrls: ['./edit-doc.component.scss']
})
export class EditDocComponent implements OnInit {

	newGood = {
    barcode: ''};

    // newGood:object = {
    // barcode: 0,
    // name:"", 
    // quantity: 0};

	displayedColumns: string[] = ['id','name','barcode', 'grup'];
	dataSource:object = [
  		// {id: 'ПН-001',name:"test", barcode:'22548', grup:'testGrup'},
  ];

  	displayedColumnsOut: string[] = ['id','name','barcode', 'grup', 'cost', 'quantity', 'delite'];
	dataSourceOut: Array<any> = [
  		 // {id: 'ПН-001',name:"test", barcode:'22548', grup:'testGrup', cost:'20', quantity:5},
  ];

  // data: Data[] = [];
  // dataSource2: Data[];


docIncId:any= 0;
markup:any = 0;


  constructor(private service: MAPIService, 
  	private dialog: MatDialog,
  	private changeDetectorRefs: ChangeDetectorRef, 
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	 this.docIncId = this.route.snapshot.params;
    console.log('its doc id',this.docIncId.id);
    this.getMarkup();
    this.getGoodInDoc()
  }


  getGood(){
  	return this.service.ReadGood(this.newGood['barcode']).subscribe((res)=>{
  		this.dataSource = res['good']
  	  // this.getGoodInDoc()// need fix !!!
      this.newGood['barcode']= '';
  	})
  }

  getGoodInDoc(){
  	return this.service.ReadDocGood(this.docIncId.id).pipe(timeout(1000)).subscribe((res)=>{
  		console.log(res)
  		this.dataSourceOut = res['incomin'];
      this.changeDetectorRefs.detectChanges();
  	})
  }

  getMarkup(){
  	return this.service.ReadMarkup(1).subscribe((res)=>{
  		console.log(res, 'its markup');
  		this.markup = res;
  	})
  }

  createInc(data){
  	this.service.CreateInc(data).subscribe((res: any)=>{
    // this.dataSourceOut.push(res.incomin[0]);
    let var1 = this.dataSourceOut;
    var1.push(res.incomin[0]);
    this.dataSourceOut = var1;
    this.getGoodInDoc();
  	})
  } 

  addToOutTable(row){
  	console.log(row , this.docIncId);

            const dialogRef = this.dialog.open(ModalGoodComponentComponent, {
           width: '50%',
           disableClose: true,
           data: {id: row.id, name:row.name, barcode: row.barcode, grup:row.grup, perentDoc:(this.docIncId.id), delimeter:row.delimeter, markup:this.markup.markup.persent}
         });

         dialogRef.afterClosed().subscribe(result => {
            console.log(111);
           this.createInc(result);
           
           // console.log(result);
         });
         // setTimeout(this.getGoodInDoc(), 1000)
         this.getGoodInDoc();
        }

     deleteInc(element){
     	console.log(element, 'its delete incomin');
     	 this.service.DeleteInc(element.incId).subscribe((res)=>{
     	 	console.log(res);
        this.getGoodInDoc();

     	 });
     	
     }

     printLabel(){
       console.log(this.dataSourceOut);
       const dialogRef = this.dialog.open(ModalPrintLabelComponent, {
           width: '80%',
           disableClose: true,
           data: this.dataSourceOut
         });

         dialogRef.afterClosed().subscribe(result => {
           console.log(result);
           if (typeof result !== 'undefined' && result.length > 0) {
             console.log('hes data', result)
             this.service.PrintLabel(result).subscribe((res)=>{
               console.log('work print', res);
               const fileURL = URL.createObjectURL(res);
                window.open(fileURL, 'Наклейки');
                URL.revokeObjectURL(fileURL);
             })
            
           }
            else {
              console.log('no has data')
            }
           // this.createInc(result);
           
           // console.log(result);
         });
         // setTimeout(this.getGoodInDoc(), 1000)
        
     }

 editElem(row){
   console.log('edit create elem', row);
   const dialogRef = this.dialog.open(ModalEditComponent, {
           width: '50%',
           disableClose: true,
           data: row
         });

         dialogRef.afterClosed().pipe(
           filter(Boolean),
           switchMap(result => this.service.UpdateElem(result))
           ).subscribe(res=>{
             console.log(res);
           })
         }


 



}
