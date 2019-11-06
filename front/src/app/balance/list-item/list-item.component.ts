import { Component, OnInit, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnChanges, OnInit {
@Input('dataTable') dataTable;
@Input('dataSource') dataSource;

// dataSource = new MatTableDataSource<any>();
displayedColumns: string[] = ['name', 'barcode', 'parcel', 'doc_name', 'date', 'price', 'quantEnd'];

  constructor() { }

  ngOnInit() {
  	 // this.dataSource = new MatTableDataSource(this.dataTable);
  }

  ngOnChanges() {
 	// this.dataSource = new MatTableDataSource(this.dataTable);
  }

}
