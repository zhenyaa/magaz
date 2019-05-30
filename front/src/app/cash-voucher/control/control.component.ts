import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.sass']
})
export class ControlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dpicker1(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    console.log(type, event);
}

  dpicker2(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    console.log(type, event);
}

}
