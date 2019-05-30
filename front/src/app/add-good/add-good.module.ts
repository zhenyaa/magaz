import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddGoodRoutingModule } from './add-good-routing.module';
import { FindBarcodeComponent } from './find-barcode/find-barcode.component';
import { ManualAddComponent } from './manual-add/manual-add.component';
import { ChoiceListComponent } from './choice-list/choice-list.component';
import { EndListComponent } from './end-list/end-list.component';
import { AddGoodComponent } from './add-good.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import {MatListModule} from '@angular/material/list';
import {DataService} from './data.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [FindBarcodeComponent, ManualAddComponent, ChoiceListComponent, EndListComponent, AddGoodComponent],
  imports: [
    CommonModule,
    AddGoodRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [DataService]

})
export class AddGoodModule { }
