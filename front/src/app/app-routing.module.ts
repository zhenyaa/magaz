import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GoodsModule} from './goods/goods.module'

const routes: Routes = [
 // { path: 'good', component: GoodsModule },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
