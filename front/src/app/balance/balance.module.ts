import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MenegComponent } from './meneg/meneg.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import { AddingComponent } from './adding/adding.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [BalanceComponent, ListItemComponent, MenegComponent, AddingComponent],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserModule,
    MatPaginatorModule

  ]
})
export class BalanceModule { }
