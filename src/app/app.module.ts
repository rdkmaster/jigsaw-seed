import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';

import {RdkButtonModule, RdkInputModule, RdkRadioModule, RdkTableModule, RdkTableRendererModule, DefaultCellRenderer,
  TableHeadCheckbox, TableCellCheckbox, TableCellNum, TableCellEditor, TableCellOption, PopupService} from '@rdkmaster/jigsaw';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RdkButtonModule,
    RdkInputModule,
    RdkRadioModule,
    RdkTableModule,
    RdkTableRendererModule
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
