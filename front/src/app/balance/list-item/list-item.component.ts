import { Component, OnInit, Input, SimpleChanges, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
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
// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatPaginator) paginator: MatPaginator;
displayedColumns: string[] = ['name', 'barcode', 'parcel', 'doc_name', 'date', 'price', 'quantEnd'];

  constructor() { }

  ngOnInit() {
  	this.dataSource.paginator = this.paginator;
  	// this.dataSource.paginator = this.paginator;
  	 // this.dataSource = new MatTableDataSource(this.dataTable);
  }

  ngOnChanges() {
 	// this.dataSource = new MatTableDataSource(this.dataTable);
  }

}
