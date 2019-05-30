import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SallingViewComponent} from './salling-view/salling-view.component'
import {SellingComponent} from './selling.component'
const routes: Routes = [
  {
    path: 'sell', component: SallingViewComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellingRoutingModule { }
