import { Component, OnInit, Input, OnChanges , AfterViewChecked} from '@angular/core';
import {BehaviorSubject, Subject, ReplaySubject} from 'rxjs';
import { ApiService} from '../api.service'
import {DataService} from '../data.service'
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
	@Input('document-id') id: string;
	@Input('dataFromId') dataFromId;
  data:any = []
dataSource:any = []
  constructor(private service: ApiService, private dataStore: DataService) {
// this.dataSource = this.dataStore.curDataSourceContent;
   }

  ngOnInit() {
    this.data = this.dataStore.getDataSourse();
  	console.log('ist id in oninit',this.id);
  	this.service.ReadDocElem(this.id).subscribe((res)=>{
  		console.log('its content res',res);
      this.dataSource = res;
  	})

  //   this.dataStore.setDataSourse([  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}])
  }

  ngOnChanges() {
  		console.log('ist id in oninit',this.id);
  	this.service.ReadDocElem(this.id).subscribe((res)=>{
  		console.log('its content res',res);
      this.dataSource = res;
  	})
  	
  }


  displayedColumns: string[] = ['id', 'ID_PARCEL', 'PRICE_COST_BEFORE', 'PRICE_COST_AFTER'];

  // dataSource = [ 
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // ]
  

}
