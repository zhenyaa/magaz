import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagementComponent} from './management.component'
import {EditDocComponent} from './edit-doc/edit-doc.component'

const routes: Routes = [
{ path: 'writeoff', component: ManagementComponent },
{ path: 'writeoff/:id', component: EditDocComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
