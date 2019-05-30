import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CashVoucherComponent} from './cash-voucher.component'

const routes: Routes = [
	{ path: 'cashvoucher', component: CashVoucherComponent },
	{ path: 'cash', component: CashVoucherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashVoucherRoutingModule { }
