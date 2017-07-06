import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {
  RdkButtonModule, RdkInputModule, RdkRadioModule, RdkTableModule, RdkTableRendererModule, DefaultCellRenderer,
  TableHeadCheckbox, TableCellCheckbox, TableCellNum, TableCellEditor, TableCellOption, PopupService,
  RdkComboSelectModule, RdkRangeTimeModule, RdkCheckBoxModule, RdkTileSelectModule, RdkPaginationModule, RdkTabsModule,
  RdkDialogModule
} from '@rdkmaster/jigsaw';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([{
      path: '**',
      component: AppComponent
    }]),
    RdkButtonModule,
    RdkInputModule,
    RdkRadioModule,
    RdkTableModule,
    RdkTableRendererModule,
    RdkComboSelectModule,
    RdkRangeTimeModule,
    RdkCheckBoxModule,
    RdkTileSelectModule,
    RdkPaginationModule,
    RdkTabsModule,
    RdkDialogModule
  ],
  providers: [PopupService],
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
export class AppModule {
}
