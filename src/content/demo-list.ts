import {NgModule} from '@angular/core';
import {
  DefaultCellRenderer,
  RdkButtonModule, RdkCheckBoxModule, RdkComboSelectModule, RdkInputModule, RdkPaginationModule, RdkRadioModule,
  RdkRangeTimeModule,
  RdkTableModule,
  RdkTableRendererModule, RdkTileSelectModule, TableCellCheckbox, TableCellEditor, TableCellNum, TableCellOption,
  TableHeadCheckbox
} from "@rdkmaster/jigsaw";
import {DemoListComponent} from "./demo.component";
import {RouterModule} from "@angular/router";
// 请按照组件的字符序排列
const demoListRoutes = [
  {
    path: '', component: DemoListComponent
  },
  {
    path: '**', //fallback router must in the last
    component: DemoListComponent
  }
];

@NgModule({
    imports: [
      RouterModule.forChild(demoListRoutes),
      RdkButtonModule,
      RdkInputModule,
      RdkRadioModule,
      RdkTableModule,
      RdkTableRendererModule,
      RdkRangeTimeModule,
      RdkComboSelectModule,
      RdkCheckBoxModule,
      RdkTileSelectModule,
      RdkPaginationModule
    ],
    exports: [],
    declarations: [
        DemoListComponent
    ],
    providers: [],
    entryComponents: [ DefaultCellRenderer,
      TableHeadCheckbox,
      TableCellCheckbox,
      TableCellOption,
      TableCellNum,
      TableCellEditor]
})
export class DemoListModule {

}
