import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenegComponent} from './meneg/meneg.component'
import {RevaluationComponent} from './revaluation.component'

const routes: Routes = [
	{path: 'reval', component: RevaluationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevaluationRoutingModule { }
