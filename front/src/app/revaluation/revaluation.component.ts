import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from './api.service';
import { FormControl, Validators } from '@angular/forms';
import {DataService} from './data.service'
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-revaluation',
  templateUrl: './revaluation.component.html',
  styleUrls: ['./revaluation.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RevaluationComponent implements OnInit {
	_stateForTab:boolean = true;

	public ValidateName: FormControl;
	public ValidateParcel: FormControl;
	public ValidateBarcode: FormControl;

	public ActionItemList: Array<any> = [
	{	
		filter: 0,
		label: 'test',
		disable: true,
		iconName: 'add',
		matTooltip: 'Создать документ',
		click: () => this.CreateNewDoc(),

	},
	{	
		filter: 0,
		label: 'test',
		disable: true,
		iconName: 'build',
		matTooltip: 'Редактировать документ',
		click: () => this.CreateNewDoc(),
	},
	{	
		filter: 0,
		label: 'test',
		disable: true,
		iconName: 'delete_forever',
		matTooltip: 'Удалить',
		click: () => this.deleteDoc(),
	},
	{
		filter: 0,
		label: 'test',
		disable: true,
		iconName: 'play_arrow',
		matTooltip: 'Применить',
		click: () => this.deleteDoc(),
	},
	{
		filter: 1,
		label: 'test',
		disable: true,
		iconName: 'print',
		matTooltip: 'Печать',
		click: () => this.deleteDoc(),
	},
	{
		filter: 1,
		label: 'test',
		disable: true,
		iconName: 'add_shopping_cart',
		matTooltip: 'Добавить',
		click: () => this.openAddWive(),
	},
	];


  constructor(private service: ApiService, private dataStore: DataService) { }

  ngOnInit() {
  	this.getDocList();
  }
  openADDWiew:boolean= false;
  doc_Id: String;
  doc_id_rep: String
  dataFromId  = new MatTableDataSource();
  listDoc = [];

  countChange(event){
  	this.doc_id_rep = event;
  }

 
  selectedIndexChange(event){
  	this._stateForTab = this._stateForTab != true;
  	console.log('iits event tab',event);
    if (event == 1){
         this.service.ReadDocElem()
    }
  }

  getDocList(){
  	this.service.ReadDocsRev().subscribe((res:any)=>{
  		console.log(res);
  		this.listDoc = res;
  		// this.dataSource = res;
  	})
  }

  CreateNewDoc(){
  	console.log("create new work");
  	this.service.CreateNewDoc().subscribe((res)=>{
  		console.log(res);
  		this.getDocList();
  	})
  }

  deleteDoc(){
  		this.service.DeleteDoc(this.doc_id_rep).subscribe((res:any)=>{
  			console.log("delete doc", res);
  			this.getDocList();

  		})
  }

  openAddWive(){
  	console.log(this.openADDWiew);
  	this.openADDWiew = this.openADDWiew != true;
  }

  validatorList(){
    this.ValidateName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[1-9][0-9]*$") //need valid for quantity
    ]);
    this.ValidateParcel = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[0-9][0-9]*$")
    ]);

    this.ValidateBarcode = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("^[0-9][0-9]*$")
    ]);
   
  }

  ActionListFilter(item){
  	console.log(item);
  	return item

  }
  filterArrayOfItem(){
  	return this.ActionItemList.filter(e => e.filter != this._stateForTab)
  }

}
