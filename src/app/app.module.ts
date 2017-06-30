import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';

import {
  RdkButtonModule, RdkInputModule, RdkRadioModule, RdkTableModule, RdkTableRendererModule, DefaultCellRenderer,
  TableHeadCheckbox, TableCellCheckbox, TableCellNum, TableCellEditor, TableCellOption, PopupService,
  RdkComboSelectModule, RdkRangeTimeModule, RdkCheckBoxModule, RdkTileSelectModule
} from '@rdkmaster/jigsaw';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RdkButtonModule,
    RdkInputModule,
    RdkRadioModule,
    RdkTableModule,
    RdkTableRendererModule,
    RdkComboSelectModule,
    RdkRangeTimeModule,
    RdkCheckBoxModule,
    RdkTileSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DefaultCellRenderer,
    TableHeadCheckbox,
    TableCellCheckbox,
    TableCellOption,
    TableCellNum,
    TableCellEditor,
  ]
})
export class AppModule { }
