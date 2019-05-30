import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GoodsComponent} from './goods.component'
import {NewGoodComponent} from './new-good/new-good.component'
import {EditGoodComponent} from './edit-good/edit-good.component'

const routes: Routes = [
	{ path: 'good', component: GoodsComponent },
	{ path: 'newgood', component: NewGoodComponent },
	{ path: 'editgood/:id', component: EditGoodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
