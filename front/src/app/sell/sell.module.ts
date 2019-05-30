import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import {SellComponent} from './sell.component';
import { FindGoodComponent } from './find-good/find-good.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'


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
import { StickyCardInfoComponent } from './sticky-card-info/sticky-card-info.component';
import { ModalListGoodComponent } from './modal-list-good/modal-list-good.component';
import { ModalQuantGoodComponent } from './modal-quant-good/modal-quant-good.component';
import {DataStoreService} from './data-store.service';
import { ModalForCalcChangeComponent } from './modal-for-calc-change/modal-for-calc-change.component'
@NgModule({
  declarations: [SellComponent, FindGoodComponent, ShoppingCartComponent, StickyCardInfoComponent, ModalListGoodComponent, ModalQuantGoodComponent, ModalForCalcChangeComponent],
  imports: [
    CommonModule,
    SellRoutingModule,
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
    MatSelectModule


  ],
   providers: [DataStoreService],
  entryComponents: [
  	SellComponent, 
  	ModalListGoodComponent, 
  	ModalQuantGoodComponent,
  	ModalForCalcChangeComponent,
  	]
})
export class SellModule { }
