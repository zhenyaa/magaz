import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
 EntityMetadataMap,
 NgrxDataModule,
 DefaultDataServiceConfig
} from 'ngrx-data';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
 root: 'crud'
};

export const entityMetadata: EntityMetadataMap = {
 Hero: {},
 User:{}
};

export const pluralNames = { Hero: 'heroes' };

@NgModule({
  declarations: [],
  providers: [
   { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
 ],
  imports: [
    CommonModule,
    NgrxDataModule.forRoot({ entityMetadata, pluralNames })
  ]
})
export class StoreModule { }
