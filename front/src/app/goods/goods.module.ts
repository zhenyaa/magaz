import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsComponent } from './goods.component';
import {RouteRoutingModule} from './route-routing.module';
import { NewGoodComponent } from './new-good/new-good.component';
import { EditGoodComponent } from './edit-good/edit-good.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'; 
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
// import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [GoodsComponent, NewGoodComponent, EditGoodComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouteRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
  ],

   entryComponents: [
    GoodsComponent
  ]
})
export class GoodsModule { }
