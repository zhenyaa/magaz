import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellingRoutingModule } from './selling-routing.module';
import { SellfindComponent } from './sellfind/sellfind.component';
import {MatInputModule} from '@angular/material/input';
import { SallingViewComponent } from './salling-view/salling-view.component';
import { SelectGoodsComponent } from './select-goods/select-goods.component';
import { SellingComponent } from './selling.component';
import { QuantityGoodsComponent } from './quantity-goods/quantity-goods.component';
import { ListSellGoodsComponent } from './list-sell-goods/list-sell-goods.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SellViewComponent } from './sell-view/sell-view.component';
import { FindComponent } from './sellView/find/find.component';
import { ListGoodComponent } from './sellView/list-good/list-good.component';
import { PaylistComponent } from './sellView/paylist/paylist.component';
import { InfoComponent } from './sellView/info/info.component';
@NgModule({
  declarations: [SellfindComponent, SallingViewComponent, SelectGoodsComponent, SellingComponent, QuantityGoodsComponent, ListSellGoodsComponent, SellViewComponent, FindComponent, ListGoodComponent, PaylistComponent, InfoComponent],
  imports: [
    CommonModule,
    SellingRoutingModule,
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
    MatIconModule
  ],
  entryComponents: [SelectGoodsComponent, QuantityGoodsComponent]
})
export class SellingModule { }
