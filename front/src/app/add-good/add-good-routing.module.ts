import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddGoodComponent} from './add-good.component';

const routes: Routes = [
{ path: 'add', component: AddGoodComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddGoodRoutingModule { }
