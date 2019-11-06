import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
// import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatButtonModule} from '@angular/material/button';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {AddGoodModule} from './add-good/add-good.module';
import {ManagementModule} from './management/management.module';
import {GoodsModule} from './goods/goods.module';
import {SellingModule} from './selling/selling.module';
import {SellModule} from './sell/sell.module';
// import {CashVoucherModule} from './cash-voucher/cash-voucher.module'
import {CashVoucherModule} from './cash-voucher/cash-voucher.module'
import {RevaluationModule} from './revaluation/revaluation.module';
import {BalanceModule} from './balance/balance.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AddGoodModule,
    ManagementModule,
    GoodsModule,
    SellingModule,
    SellModule,
    CashVoucherModule,
    RevaluationModule,
    BalanceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
