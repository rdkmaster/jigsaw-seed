import {Component} from "@angular/core";
import {ArrayCollection, PageableTableData, TableData, TimeGr, TimeService} from "@rdkmaster/jigsaw";
import {Http} from "@angular/http";

@Component({
  selector: 'rdk-demo-list',
  templateUrl: 'demo-list.html',
  styleUrls : ['demo-list.scss']

})
export class DemoListComponent {
  beginDate = "now-1d"
  endDate = "now"
  rangeTimeComboValue = new ArrayCollection([
    {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
    {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
  ]);

  periodTimes = [{label:"1", closable: false},{label:"2", closable: false},{label:"3", closable: false},
                {label:"4", closable: false},{label:"5", closable: false},{label:"6", closable: false},
                {label:"7", closable: false},{label:"8", closable: false},{label:"9", closable: false},
                {label:"10", closable: false},{label:"11", closable: false},{label:"12", closable: false}];

  quickChoices = [{label:"一天",id:"1"},{label:"三天",id:"2"},{label:"七天",id:"3"}]

  businessTypes = [{label:"LTE用户面", closable: false}]

  displayTypes = [{label:"合并",id:"1"},{label:"分表",id:"2"}]

  quickChoiceChange(choice){
    console.log(choice)
  }

  displayTypeChange(displayType){
    console.log(displayType)
  }

  pageable:PageableTableData;
  constructor(http:Http) {
    this.pageable = new PageableTableData(http, {
      url: 'http://localhost:4200/mock-data/table/paging-data.json',
      params: {aa: 11, bb: 22}, method:'get'
    });
    this.pageable.onAjaxComplete(() => {
      console.log(this.pageable);
    });
    this.pageable.fromAjax();
  }

  getCurrentPage(){
    this.pageable.changePage(this.pageable.pagingInfo);
  }
  getPageSize(){
    this.pageable.changePage(this.pageable.pagingInfo);
  }

}
