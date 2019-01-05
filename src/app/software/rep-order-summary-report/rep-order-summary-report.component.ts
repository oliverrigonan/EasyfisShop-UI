import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

import { RepOrderSummaryReportService } from './rep-order-summary-report.service'

import { ToastrService } from 'ngx-toastr';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-rep-order-summary-report',
  templateUrl: './rep-order-summary-report.component.html',
  styleUrls: ['./rep-order-summary-report.component.css']
})
export class RepOrderSummaryReportComponent implements OnInit {
  constructor(
    private repOrderSummaryReportService: RepOrderSummaryReportService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();
  public shopOrderStartDateFilterData = new Date();
  public shopOrderEndDateFilterData = new Date();

  public cboShopGroupSubscription: any;
  public cboShopGroupObservableArray: ObservableArray = new ObservableArray();
  @ViewChild('cboShopGroup') cboShopGroup: WjComboBox;

  public cboOrderSummaryReportStatusSubscription: any;
  public cboOrderSummaryReportStatusObservableArray: ObservableArray = new ObservableArray();
  @ViewChild('cboOrderSummaryReportStatus') cboOrderSummaryReportStatus: WjComboBox;

  public isDataLoaded: boolean = false;
  public listOrderSummaryReportSubscription: any;
  public listOrderSummaryReportObservableArray: ObservableArray = new ObservableArray();
  public listOrderSummaryReportCollectionView: CollectionView = new CollectionView(this.listOrderSummaryReportObservableArray);
  public listShopPageIndex: number = 15;
  @ViewChild('listOrderSummaryReportFlexGrid') listOrderSummaryReportFlexGrid: WjFlexGrid;

  public totalNumberOfOrders: string = "0.00";
  public totalAmount: string = "0.00";

  // Combo box for number of rows
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

    this.createCboShopGroup();
  }

  public cboShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.listShopPageIndex = selectedValue;

    this.listOrderSummaryReportCollectionView.pageSize = this.listShopPageIndex;
    this.listOrderSummaryReportCollectionView.refresh();
    this.listOrderSummaryReportCollectionView.refresh();
  }

  // Start date text changed event
  public startDateTextChanged(): void {
    if (this.isDataLoaded) {
      setTimeout(() => {
        this.listOrderSummaryReport();
      }, 100);
    }
  }

  // End date text changed event
  public endDateTextChanged(): void {
    if (this.isDataLoaded) {
      setTimeout(() => {
        this.listOrderSummaryReport();
      }, 100);
    }
  }

  // Create combo box shop group
  public createCboShopGroup(): void {
    this.repOrderSummaryReportService.listShopGroup();
    this.cboShopGroupSubscription = this.repOrderSummaryReportService.listShopGroupObservable.subscribe(
      data => {
        let shopGroupObservableArray = new ObservableArray();

        if (data != null) {
          for (var i = 0; i <= data.length - 1; i++) {
            shopGroupObservableArray.push({
              Id: data[i].Id,
              ShopGroupCode: data[i].ShopGroupCode,
              ShopGroup: data[i].ShopGroup
            });
          }
        }

        this.cboShopGroupObservableArray = shopGroupObservableArray;
        if (this.cboShopGroupObservableArray.length > 0) {
          this.createCboOrderSummaryReportStatus();
        }

        if (this.cboShopGroupSubscription != null) this.cboShopGroupSubscription.unsubscribe();
      }
    );
  }

  // Combo box shop group selected index changed
  public cboShopGroupSelectedIndexChanged(): void {
    if (this.isDataLoaded) {
      if (this.cboShopGroup.selectedValue != null) {
        setTimeout(() => {
          this.listOrderSummaryReport();
        }, 100);
      }
    }
  }

  // Create combo box shop order status
  public createCboOrderSummaryReportStatus(): void {
    this.repOrderSummaryReportService.listOrderSummaryReportStatus();
    this.cboOrderSummaryReportStatusSubscription = this.repOrderSummaryReportService.listOrderSummaryReportStatusObservable.subscribe(
      data => {
        let shopOrderStatusObservableArray = new ObservableArray();

        if (data != null) {
          for (var i = 0; i <= data.length - 1; i++) {
            shopOrderStatusObservableArray.push({
              Id: data[i].Id,
              ShopOrderStatusCode: data[i].ShopOrderStatusCode,
              ShopOrderStatus: data[i].ShopOrderStatus
            });
          }
        }

        this.cboOrderSummaryReportStatusObservableArray = shopOrderStatusObservableArray;
        if (this.cboOrderSummaryReportStatusObservableArray.length > 0) {
          setTimeout(() => {
            this.listOrderSummaryReport();
          }, 100);
        }

        if (this.cboOrderSummaryReportStatusSubscription != null) this.cboOrderSummaryReportStatusSubscription.unsubscribe();
      }
    );
  }

  // Combo box shop order status selected index changed
  public cboOrderSummaryReportStatusSelectedIndexChanged(): void {
    if (this.isDataLoaded) {
      if (this.cboOrderSummaryReportStatus.selectedValue != null) {
        setTimeout(() => {
          this.listOrderSummaryReport();
        }, 100);
      }
    }
  }

  // List shop order
  public listOrderSummaryReport(): void {
    this.listOrderSummaryReportObservableArray = new ObservableArray();
    this.listOrderSummaryReportCollectionView = new CollectionView(this.listOrderSummaryReportObservableArray);
    this.listOrderSummaryReportCollectionView.pageSize = 15;
    this.listOrderSummaryReportCollectionView.trackChanges = true;
    this.listOrderSummaryReportCollectionView.refresh();
    this.listOrderSummaryReportFlexGrid.refresh();

    let startDate = [this.shopOrderStartDateFilterData.getFullYear(), this.shopOrderStartDateFilterData.getMonth() + 1, this.shopOrderStartDateFilterData.getDate()].join('-');
    let endDate = [this.shopOrderEndDateFilterData.getFullYear(), this.shopOrderEndDateFilterData.getMonth() + 1, this.shopOrderEndDateFilterData.getDate()].join('-');

    let shopGroupId: number = 0;
    if (this.cboShopGroup.selectedValue != null) {
      shopGroupId = this.cboShopGroup.selectedValue;
    }

    let shopOrderStatusId: number = 0;
    if (this.cboOrderSummaryReportStatus.selectedValue != null) {
      shopOrderStatusId = this.cboOrderSummaryReportStatus.selectedValue;
    }

    if (shopGroupId != 0 && shopOrderStatusId != 0) {
      this.repOrderSummaryReportService.listOrderSummaryReport(startDate, endDate, shopGroupId, shopOrderStatusId);
      this.listOrderSummaryReportSubscription = this.repOrderSummaryReportService.listOrderSummaryReportObservable.subscribe(
        data => {
          if (data.length > 0) {
            this.totalNumberOfOrders = parseFloat(data.length.toString()).toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let totalAmount: number = 0;
            for (var i = 0; i <= data.length - 1; i++) {
              totalAmount += parseFloat(data[i].Amount.toString())
            }

            this.totalAmount = totalAmount.toFixed(2).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.listOrderSummaryReportObservableArray = data;
            this.listOrderSummaryReportCollectionView = new CollectionView(this.listOrderSummaryReportObservableArray);
            this.listOrderSummaryReportCollectionView.pageSize = this.listShopPageIndex;
            this.listOrderSummaryReportCollectionView.trackChanges = true;
            this.listOrderSummaryReportCollectionView.refresh();
            this.listOrderSummaryReportFlexGrid.refresh();
          }

          this.isDataLoaded = true;
          if (this.listOrderSummaryReportSubscription != null) this.listOrderSummaryReportSubscription.unsubscribe();
        }
      );
    } else {
      this.toastr.error("Invalid filters.", "Error");
    }
  }

  // Download CSV order summary report
  public btnCSVOrderSummaryReportClick(): void {
    let data: any[] = [{
      Date: "Date",
      OrderNo: "Order No",
      Item: "Item",
      Quantity: "Quantity",
      Amount: "Amount",
      Particulars: "Particulars",
      ShopGroup: "Shop Group",
      ShopOrderStatus: "Order Status",
      StatusDate: "Status Date",
    }];

    if (this.listOrderSummaryReportCollectionView.items.length > 0) {
      for (let p = 1; p <= this.listOrderSummaryReportCollectionView.pageCount; p++) {
        for (let i = 0; i < this.listOrderSummaryReportCollectionView.items.length; i++) {
          data.push({
            Date: this.listOrderSummaryReportCollectionView.items[i].SPDate,
            OrderNo: this.listOrderSummaryReportCollectionView.items[i].SPNumber,
            Item: this.listOrderSummaryReportCollectionView.items[i].Item,
            Quantity: this.listOrderSummaryReportCollectionView.items[i].Quantity,
            Amount: this.listOrderSummaryReportCollectionView.items[i].Amount,
            Particulars: this.listOrderSummaryReportCollectionView.items[i].Particulars,
            ShopGroup: this.listOrderSummaryReportCollectionView.items[i].ShopGroup,
            ShopOrderStatus: this.listOrderSummaryReportCollectionView.items[i].ShopOrderStatus,
            StatusDate: this.listOrderSummaryReportCollectionView.items[i].ShopOrderStatusDate
          });
        }

        if (p == this.listOrderSummaryReportCollectionView.pageCount) {
          this.listOrderSummaryReportCollectionView.moveToFirstPage();
        } else {
          this.listOrderSummaryReportCollectionView.moveToNextPage();
        }
      }
    }

    let startDate = ('0' + (this.shopOrderStartDateFilterData.getMonth() + 1)).slice(-2) + '-' + ('0' + this.shopOrderStartDateFilterData.getDate()).slice(-2) + '-' + this.shopOrderStartDateFilterData.getFullYear();
    let endDate = ('0' + (this.shopOrderEndDateFilterData.getMonth() + 1)).slice(-2) + '-' + ('0' + this.shopOrderEndDateFilterData.getDate()).slice(-2) + '-' + this.shopOrderEndDateFilterData.getFullYear();

    new Angular5Csv(data, "Order Summary Report - From " + startDate + " To " + endDate);
  }

  // On page load
  ngOnInit() {
    this.createCboShowNumberOfRows();
  }

  // On page destroy
  ngOnDestroy() {
    if (this.cboShopGroupSubscription != null) this.cboShopGroupSubscription.unsubscribe();
    if (this.cboOrderSummaryReportStatusSubscription != null) this.cboOrderSummaryReportStatusSubscription.unsubscribe();
    if (this.listOrderSummaryReportSubscription != null) this.listOrderSummaryReportSubscription.unsubscribe();
  }
}
