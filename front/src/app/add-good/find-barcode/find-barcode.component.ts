import { Component,Input, Output, OnInit } from '@angular/core';
import {AddGoodService} from '../add-good.service';
import {DataService} from '../data.service';
@Component({
  selector: 'app-find-barcode',
  templateUrl: './find-barcode.component.html',
  styleUrls: ['./find-barcode.component.scss']
})
export class FindBarcodeComponent implements OnInit {

  constructor(private service: AddGoodService, private dataService: DataService) { }

  ngOnInit() {
  }

  data = ""; 
  chipsStatmen = false;

  changeChipsStatment(){
    this.chipsStatmen = true;
    setTimeout(() => this.chipsStatmen = false, 10000)
    // setTimeout(, 1000);

  }

  ReadGood(){
  	console.log("test read Barcode!", this.data)
  	this.service.ReadGood(this.data).subscribe(res => {this.dataService.sendMessage(res)},
      err =>this.changeChipsStatment());
    this.data = '';
  	// this.service.ReadGood(this.data); 
  }

}
