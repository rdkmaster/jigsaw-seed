import {Component, Renderer2, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {
  AdditionalColumnDefine,
  ArrayCollection, ColumnDefine, PopupInfo, PopupService, RdkTable, TableCellCheckbox, TableData, TableHeadCheckbox,
  TimeGr,
  TimeService
} from '@rdkmaster/jigsaw';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  beginDate = 'now-1d';
  endDate = 'now';
  rangeTimeComboValue = new ArrayCollection([
    {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
    {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
  ]);

  periodTimes = [{label: '1', closable: false}, {label: '2', closable: false}, {label: '3', closable: false},
    {label: '4', closable: false}, {label: '5', closable: false}, {label: '6', closable: false},
    {label: '7', closable: false}, {label: '8', closable: false}, {label: '9', closable: false},
    {label: '10', closable: false}, {label: '11', closable: false}, {label: '12', closable: false}];

  quickChoices = [{label: '一天', id: '1'}, {label: '三天', id: '2'}, {label: '七天', id: '3'}];

  selectedChoice = this.quickChoices[0];


  businessTypes = [{label: 'LTE用户面', closable: false}, {label: 'LTE控制面', closable: false}];

  displayTypes = [{label: '合并', id: '1'}, {label: '分表', id: '2'}];

  displayType = this.displayTypes[0];

  interfaces = [{label: 'S1-U', closable: false}, {label: 'S2-U', closable: false}];

  userTypes = [{label: 'IMSI', closable: false}, {label: 'MSISDN', closable: false}];

  // pageable:PageableTableData;

  // TODO fix#77
  // selectUserType = [this.userTypes[0]];
  selectUserType = new ArrayCollection([{label: 'IMSI', closable: false}]);

  maxRecord = 1000;

  tableData: TableData;

  tabDatas;

  resultDisplay = false;

  tabSelectIndex = 0;

  headerData: TableData;

  @ViewChild('dialog') dialog: TemplateRef<any>;

  dialogInfo: PopupInfo;

  @ViewChild('settingTable') settingTable: RdkTable;

  tableColumnDefine: ColumnDefine[] = [];


  additionalColumns: AdditionalColumnDefine[] = [{
    pos: 0,
    header: {
      renderer: TableHeadCheckbox,
    },
    cell: {
      renderer: TableCellCheckbox
    }
  }];


  constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2, private http: Http,
              private popupService: PopupService) {
    this.tableData = new TableData();
    this.tableData.http = http;
  }

  quickChoiceChange(quickChoice) {
    switch (quickChoice.id) {
      case '1':
        this.beginDate = 'now-1d';
        break;
      case '2':
        this.beginDate = 'now-3d';
        break;
      case '3':
        this.beginDate = 'now-1w';
        break;
    }
    this.endDate = 'now';
    this.handleChange();
  }

  handleChange() {
    this.rangeTimeComboValue = new ArrayCollection([
      {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
      {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
    ]);
  }

  displayTypeChange(displayType) {
    console.log(displayType)
  }

  doSearch() {
    this.resultDisplay = false;
    // 清理数据
    if (this.tabDatas && this.tabDatas.length !== 0) {
      this.tabDatas.forEach(tabData => {
        this[tabData.id].destroy();
      })
    }
    if (this.displayType.id === '1') {
      this.tableData.fromAjax('mock-data/table/data.json');
    } else {
      this.tabDatas = [{label: 'HTTP_XDR', id: 'HttpData', url: 'mock-data/table/data.json'},
        {label: 'DNS_XDR', id: 'DnsData', url: 'mock-data/table/data.json'}];
      this.tabDatas.forEach(tabData => {
        this[tabData.id] = new TableData();
        this[tabData.id].http = this.http;
        this[tabData.id].fromAjax(tabData.url);
        this[tabData.id + 'ColumnDefine'] = [];
      })
    }

    this.resultDisplay = true;
  }

  customColumnDefine() {
    this.headerData = new TableData();
    this.headerData.header = ['名称'];
    this.headerData.field = ['name'];
    if (this.displayType.id === '1') {
      this.tableData.header.forEach(header => this.headerData.data.push([header]));
    } else {
      this[this.tabDatas[this.tabSelectIndex].id].header.forEach(header => this.headerData.data.push([header]));
    }
    this.dialogInfo = this.popupService.popup(this.dialog);
    setTimeout(() => {
      this.settingTable.getRenderers(0).forEach(renderer => {
        if (this.displayType.id === '1') {
          this._setCheckBoxState(renderer, this.tableColumnDefine);
        } else {
          this._setCheckBoxState(renderer, this[this.tabDatas[this.tabSelectIndex].id + 'ColumnDefine']);
        }
      });
    })
  }

  _setCheckBoxState(renderer, tableColumnDefine: ColumnDefine[]) {
    if (tableColumnDefine && tableColumnDefine.length !== 0
      && tableColumnDefine.filter(columnDefine => columnDefine.target === renderer.renderer.checkboxState.row).length !== 0) {
      renderer.renderer.setCheckboxState(false);
    } else {
      renderer.renderer.setCheckboxState(true);
    }
  }

  finishSetting() {
    if (this.displayType.id === '1') {
      this.tableColumnDefine = [];
    } else {
      this[this.tabDatas[this.tabSelectIndex].id + 'ColumnDefine'] = [];
    }
    this.settingTable.getRenderers(0).forEach(renderer => {
      const checkboxState = renderer.renderer.checkboxState;
      if (checkboxState.checked === 0) {
        if (this.displayType.id === '1') {
          this._modifyColumnDefine(this.tableColumnDefine, checkboxState.row);
        } else {
          this._modifyColumnDefine(this[this.tabDatas[this.tabSelectIndex].id + 'ColumnDefine'], checkboxState.row);
        }
      }
    });
    this.dialogInfo.dispose();
  }

  _modifyColumnDefine(tableColumnDefine: ColumnDefine[], row: number) {
    tableColumnDefine.push({target: row, visible: false});
  }

  // constructor() {
  //   this.pageable = new PageableTableData(http, {
  //     url: 'http://localhost:4200/mock-data/table/paging-data.json',
  //     params: {aa: 11, bb: 22}, method:'get'
  //   });
  //   this.pageable.onAjaxComplete(() => {
  //     console.log(this.pageable);
  //   });
  //   this.pageable.fromAjax();
  // }

  getCurrentPage() {
    // this.pageable.changePage(this.pageable.pagingInfo);
  }

  getPageSize() {
    // this.pageable.changePage(this.pageable.pagingInfo);
  }

}
