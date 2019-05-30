import { Component, OnInit } from '@angular/core';
import {MAPIService} from '../m-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {

  constructor(private service: MAPIService, private route :Router) { }

  ngOnInit() {
  	this.readDocList();
  }

  displayedColumns: string[] = ['nameId','date', 'updated_at','number', 'sum', 'status', 'edit', 'delete'];
  dataSource:object = [
  // {name: 'ПН-001', date:'24.02.2018', summ:'2534.00', inpay: true},
  
  ];

  newincomingDoc(){
  	return this.service.CreateNew("new").subscribe((res)=>{
  		console.log(res);
  		this.readDocList();
  	})
  }

  readDocList(){
  	this.service.ReadDocsInc().subscribe((res:any)=>{
      let t = res.sort((a, b) => a.date < b.date ? 1 : -1);
  		this.dataSource = res.sort((a, b) => a.nameId < b.nameId ? 1 : -1);

  	})
  }

  editDoc(row){
  	console.log(row);
  	this.route.navigate(['writeoff', row.id])

  }
  changeStatus(event, id){
    console.log( event.checked," ", id, "test change work!!!")
    this.service.UpdateStatus(id, event.checked).subscribe((res)=>{
      console.log(res)
    })
  }

  deleteDoc(element){
  	console.log('work delete', element)
  	this.service.DeleteIncDoc(element.id).subscribe((res)=>{
  		console.log(res);
      this.readDocList();
  	})
  }

}
