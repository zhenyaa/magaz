import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef, MatDialogConfig} from "@angular/material";
import {SelectGoodsComponent} from '../select-goods/select-goods.component'
@Component({
  selector: 'app-sellfind',
  templateUrl: './sellfind.component.html',
  styleUrls: ['./sellfind.component.css']
})


export class SellfindComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  public dataTest:Array<Object> = [
    {id:1, barcode: 223355, name: "kitkat", cost: 34},
    {id:8, barcode: 223356, name: "snikers", cost: 37},
    {id:3, barcode: 223357, name: "baunty", cost: 33},
    {id:4, barcode: 223358, name: "nats", cost: 35},
    {id:5, barcode: 223358, name: "nats", cost: 35},
    {id:6, barcode: 223358, name: "nats", cost: 35},
    {id:7, barcode: 223358, name: "nats", cost: 35},
    {id:8, barcode: 223358, name: "nats", cost: 35},
    {id:9, barcode: 223358, name: "nats", cost: 35},
    {id:12, barcode: 223358, name: "nats", cost: 35},
    {id:13, barcode: 223358, name: "nats", cost: 35},
    {id:14, barcode: 223358, name: "nats", cost: 35},
    {id:15, barcode: 223358, name: "nats", cost: 35},
    {id:16, barcode: 223358, name: "nats", cost: 35},
    {id:17, barcode: 223358, name: "nats", cost: 35},
    {id:18, barcode: 223358, name: "nats", cost: 35},
    {id:19, barcode: 223358, name: "nats", cost: 35},
    {id:20, barcode: 223358, name: "nats", cost: 35},
    {id:21, barcode: 223358, name: "nats", cost: 35},
    {id:22, barcode: 223358, name: "nats", cost: 35},
    {id:23, barcode: 223358, name: "nats", cost: 35},
    {id:24, barcode: 223358, name: "nats", cost: 35},
    {id:25, barcode: 223358, name: "nats", cost: 35}
  ];
//   openDialog() {
//         const dialogConfig = new MatDialogConfig();
//         // dialogConfig.disableClose = true;
//         dialogConfig.autoFocus = true;
//         dialogConfig.width = '60%';
//         console.log(this.dataTest)
//         this.dialog.open(SelectGoodsComponent, {data: this.dataTest, width: '600px', height: '600px',}
// );
//     }

    openDialog() {
          const dialogConfig = new MatDialogConfig();
          // dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '60%';
          console.log(this.dataTest)
          let dialogRef = this.dialog.open(SelectGoodsComponent, {data: this.dataTest, width: '600px', height: '600px',}
  );
  dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`);
  alert(result);
});
      }
}
