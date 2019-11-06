import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ApiService} from '../api.service'
@Component({
  selector: 'app-meneg',
  templateUrl: './meneg.component.html',
  styleUrls: ['./meneg.component.sass']
})
export class MenegComponent implements OnInit {
	 @Output() increment: EventEmitter<string> = new EventEmitter<string>();
	 @Input('listDoc') listDoc;


  constructor(private service: ApiService,) { }

  selectedRowIndex: number = -1;

  ngOnInit() {
  	// this.service.ReadDocsRev().subscribe((res:any)=>{
  	// 	console.log(res);
  	// 	this.dataSource = res;
  	// })
  }

  displayedColumns: string[] = ['name', 'quant', 'amount_by', 'amount_after', 'diff_per', 'dif_amount', 'status'];
  dataSource = [];

 highlight(row){
 	console.log('selected row', row);
    this.selectedRowIndex = row.id;
    this.increment.emit(row.id);
}

}
