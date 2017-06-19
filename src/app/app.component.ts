import {Component, Renderer2, ViewContainerRef} from '@angular/core';

import {
  ArrayCollection, TableData, SortAs, SortOrder, DefaultCellRenderer, TableCellEditor, AdditionalColumnDefine,
  TableCellNum,
  TableHeadCheckbox,
  TableCellOption,
  TableCellCheckbox,
  ColumnDefine
} from '@rdkmaster/jigsaw';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = 'jigsaw';

  public selectedCity: {};
  cities = new ArrayCollection([
    {label: '北京', id: 0},
    {label: '上海', id: 2},
    {label: '南京', id: 3},
    {label: '深圳', id: 4},
    {label: '长沙', id: 5},
    {label: '西安', id: 6}
  ]);

  tableData: TableData;

  _columns: ColumnDefine[] = [
    {
      target: 'f1',
      width: '15%',
      cell: {
        renderer: DefaultCellRenderer,
        class: 'green-text'
      },
      group: true
    },
    {
      target: 'f2',
      width: '10%',
      header: {
        class: 'red-text',
        sortable: true,
        sortAs: SortAs.number,
        defaultSortOrder: SortOrder.des
      },
      cell: {
        // renderer: TableCellDefault, //支持不写renderer
        editable: true,
        editorRenderer: TableCellEditor,
      }
    },
    {
      target: 'f3',
      cell: {
        renderer: DefaultCellRenderer
      },
      group: true
    },
    {
      target: 'f4',
      // visible: false
    },
    {
      target: 'f5',
      cell: {
        renderer: DefaultCellRenderer
      },
      group: true
    },
    {
      target: 'f6',
      header: {
        sortable: true,
        sortAs: SortAs.string,
        defaultSortOrder: SortOrder.default
      },
      group: true
    },
    {
      target: 6,
      visible: false,
    },
    {
      target: (field, index) => {
        return index > 2
      },
      header: {
        class: 'big-text'
      }
    },
    {
      target: ['f1', 'f5'],
      header: {
        class: 'green-text'
      }
    }
  ];

  _additionalColumns: AdditionalColumnDefine[] = [
    {
      pos: 0,
      width: '60px',
      header: {
        text: '#',
      },
      cell: {
        renderer: TableCellNum
      }
    },
    {
      pos: 0,
      field: 'f4',
      width: '60px',
      header: {
        renderer: TableHeadCheckbox
      },
      cell: {
        renderer: TableCellCheckbox
      }
    },
    /*{
     pos: 0,
     width: '60px',
     header: {
     renderer: TableHeadCheckbox,
     },
     cell: {
     renderer: TableCellCheckbox
     }
     },*/
    {
      // pos: -1, //不写pos也表示插入到最后
      width: '10%',
      header: {
        text: '操作',
        class: 'red-text'
      },
      cell: {
        renderer: TableCellOption
      }
    },
    /*{
     pos: 2,
     width: '10%',
     header: {
     renderer: TableHeadOption,
     class: 'red-text'
     },
     cell: {
     renderer: TableCellOption
     }
     }*/
  ];

  _changeMsg: string;

  constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
    this.selectedCity = 5;

    this.tableData = new TableData([
      [22, 12, 11, 0, 12, 12, 111],
      [22, 23, 11, 1, 23, 23, 111],
      [22, 43, 11, 1, 43, 77, 111],
      [22, 12, 12, 0, 12, 77, 111],
      [23, 55, 23, 1, 23, 23, 111],
      [43, 55, 43, 0, 44, 43, 111],
      [12, 55, 12, 1, 44, 12, 111],
      [23, 55, 23, 1, 44, 23, 111],
      [43, 43, 43, 0, 44, 43, 111],
      [12, 12, 33, 0, 12, 66, 111],
      [23, 23, 33, 0, 88, 66, 111],
      [43, 43, 33, 1, 88, 66, 111],
      [12, 11, 12, 1, 88, 66, 111],
      [23, 11, 23, 0, 23, 23, 111],
      [43, 43, 43, 1, 43, 43, 111],
      [12, 12, 12, 1, 99, 12, 111],
      [23, 23, 23, 0, 99, 23, 111],
      [43, 43, 43, 1, 99, 43, 111]
    ], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);
  }

  public radioChange(message: any) {
    console.log(`switch message is: ${message.label}`);
  }

  public onCellChange(value) {
    this._changeMsg = `field: '${value.field}',
                      row: ${value.row},
                      column: ${value.column},
                      rawColumn: ${value.rawColumn},
                      cellData: ${value.cellData},
                      oldCellData: ${value.oldCellData}`;
    const rows = value.row instanceof Array ? value.row : [value.row];
    for (const row of rows) {
      console.log(this.tableData.data[row][value.rawColumn]);
    }
  }
}
