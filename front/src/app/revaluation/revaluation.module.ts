import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevaluationRoutingModule } from './revaluation-routing.module';
import { MenegComponent } from './meneg/meneg.component';
import { RevaluationComponent } from './revaluation.component';
import { MatTabsModule} from '@angular/material/tabs';
import { MatTableModule} from '@angular/material/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ContentComponent } from './content/content.component';
import { AddingComponent } from './adding/adding.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material';
import { MatButtonModule} from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
// import { MyfilterPipe } from './myfilter.pipe';
import {DataService} from './data.service'

import {  StorageService } from './adding/adding.component';

@NgModule({
  declarations: [MenegComponent, RevaluationComponent, ContentComponent, AddingComponent, ModalComponent],
  imports: [
    CommonModule,
    RevaluationRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [DataService, StorageService ],

  entryComponents: [
  	MenegComponent,
  	ModalComponent
  	]
})
export class RevaluationModule { }
