import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ApiService} from '../api.service'
import {DataService} from "../data.service"
@Component({
  selector: 'app-meneg',
  templateUrl: './meneg.component.html',
  styleUrls: ['./meneg.component.sass']
})
export class MenegComponent implements OnInit {
  /*
  Компонент отоброжения Документов
  */
	 @Output() increment: EventEmitter<string> = new EventEmitter<string>();
	 @Input('listDoc') listDoc;


  constructor(private service: ApiService, private dataStore: DataService) { }

  selectedRowIndex: number = -1;

  ngOnInit() {
  }

  displayedColumns: string[] = ['name', 'quant', 'amount_by', 'amount_after', 'diff_per', 'dif_amount', 'status'];
  dataSource = [];

 highlight(row){
 	  console.log('selected row', row);
    this.selectedRowIndex = row.id;
    this.increment.emit(row.id);
    this.dataStore.setDocumentID(row.id);
}

}
