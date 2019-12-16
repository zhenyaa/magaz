import { Component, OnInit, Input, OnChanges , AfterViewChecked, DoCheck} from '@angular/core';
import {BehaviorSubject, Subject, ReplaySubject} from 'rxjs';
import { ApiService} from '../api.service'
import {DataService} from '../data.service'
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit, OnChanges {
// отображение элементов документа
	@Input('document-id') id: string;
	@Input('dataFromId') dataFromId;
  data:any = []
  dataSource:any = []
  constructor(private service: ApiService, private dataStore: DataService) {
   }

  ngOnInit() {
    this.data = this.dataStore.getRavalList()
    console.log(this.dataStore.getRavalList().value);
  	}

  ngOnChanges() {
  }
  displayedColumns: string[] = ['id', 'ID_PARCEL', 'name','PRICE_COST_BEFORE', 'PRICE_COST_AFTER', 'event'];

deleteInc(element){
  this.service.DelateRevalGood(element.id).subscribe(res =>{
    this.service.ReadDocElem()
  })
}

}
