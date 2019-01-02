import { Component, OnInit } from '@angular/core';
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

@Component({
  selector: 'app-mst-shop-order-status',
  templateUrl: './mst-shop-order-status.component.html',
  styleUrls: ['./mst-shop-order-status.component.css']
})
export class MstShopOrderStatusComponent implements OnInit {
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
