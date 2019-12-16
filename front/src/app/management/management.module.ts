import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { EditDocComponent } from './edit-doc/edit-doc.component';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { MatDialogModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import { ModalGoodComponentComponent } from './edit-doc/modal-good-component/modal-good-component.component';
// import {ModalGoodComponentComponent} from './edit-doc/modal-good-component/modal-good-component.component'
import {MatIconModule} from '@angular/material/icon';
import { ModalPrintLabelComponent } from './edit-doc/modal-print-label/modal-print-label.component';
import { ModalEditComponent } from './edit-doc/modal-edit/modal-edit.component';

@NgModule({
  declarations: [ManagementComponent, DocListComponent, EditDocComponent, ModalGoodComponentComponent, ModalPrintLabelComponent, ModalEditComponent],
  imports: [
  	BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    ManagementRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,

  ],
  entryComponents: [ModalGoodComponentComponent, ModalPrintLabelComponent, ModalEditComponent],
})
export class ManagementModule { }
