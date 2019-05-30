import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//user component import
import { CashVoucherRoutingModule } from './cash-voucher-routing.module';
import {CashVoucherComponent} from './cash-voucher.component';
import { ControlComponent } from './control/control.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component'
/////////////////////////////////////////////////////////////
//other component import

import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';


@NgModule({
  declarations: [CashVoucherComponent, ControlComponent, VoucherListComponent],
  imports: [
    CommonModule,
    CashVoucherRoutingModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,


  ],

  entryComponents: [
  	CashVoucherComponent,
  	  	],
})
export class CashVoucherModule { }
