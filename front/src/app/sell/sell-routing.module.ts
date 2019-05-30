import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SellComponent} from './sell.component'

const routes: Routes = [
	{ path: 'sellT', component: SellComponent },
	{ path:'test', component:SellComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }
