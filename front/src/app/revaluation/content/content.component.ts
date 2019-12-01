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
    this.service.ReadDocElem(this.id).subscribe((res:any)=>{
      this.dataSource = res;
    })
  	}

  ngOnChanges() {
  	this.service.ReadDocElem(this.id).subscribe((res)=>{
      this.dataSource = res;
  	})
  }
  displayedColumns: string[] = ['id', 'ID_PARCEL', 'PRICE_COST_BEFORE', 'PRICE_COST_AFTER', 'event'];

deleteInc(element){
  console.log('test delate elem', element);
  this.service.DelateRevalGood(element.id).subscribe(res =>{
    console.log(res);
    
  })
}

}
