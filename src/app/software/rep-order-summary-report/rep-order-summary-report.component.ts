import { Component, OnInit } from '@angular/core';
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

@Component({
  selector: 'app-rep-order-summary-report',
  templateUrl: './rep-order-summary-report.component.html',
  styleUrls: ['./rep-order-summary-report.component.css']
})
export class RepOrderSummaryReportComponent implements OnInit {
  constructor() { }

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();
  public createCboShowNumberOfRows(): void {
    for (var i = 0; i <= 4; i++) {
      var rows = 0;
      var rowsString = "";

      if (i == 0) {
        rows = 15;
        rowsString = "Show 15";
      } else if (i == 1) {
        rows = 50;
        rowsString = "Show 50";
      } else if (i == 2) {
        rows = 100;
        rowsString = "Show 100";
      } else if (i == 3) {
        rows = 150;
        rowsString = "Show 150";
      } else {
        rows = 200;
        rowsString = "Show 200";
      }

      this.cboShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });
    }
  }

  ngOnInit() {
    this.createCboShowNumberOfRows();
  }

}
