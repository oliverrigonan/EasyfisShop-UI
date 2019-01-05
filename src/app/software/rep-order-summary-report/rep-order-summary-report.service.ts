import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
import { ObservableArray } from 'wijmo/wijmo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepOrderSummaryReportService {
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  // Request options
  public options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };
  public defaultAPIURLHost: string = this.appSettings.defaultAPIURLHost;

  // Subjects and Observables
  public listShopGroupSource = new Subject<ObservableArray>();
  public listShopGroupObservable = this.listShopGroupSource.asObservable();
  public listOrderSummaryReportStatusSource = new Subject<ObservableArray>();
  public listOrderSummaryReportStatusObservable = this.listOrderSummaryReportStatusSource.asObservable();
  public listOrderSummaryReportSource = new Subject<ObservableArray>();
  public listOrderSummaryReportObservable = this.listOrderSummaryReportSource.asObservable();

  // List shop group
  public listShopGroup(): void {
    let listShopGroupObservableArray = new ObservableArray();
    this.listShopGroupSource.next(listShopGroupObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/orderSummaryReport/dropdown/list/shopOrderGroup", this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listShopGroupObservableArray.push({
              Id: results[i].Id,
              ShopGroupCode: results[i].ShopGroupCode,
              ShopGroup: results[i].ShopGroup
            });
          }
        }

        this.listShopGroupSource.next(listShopGroupObservableArray);
      }
    );
  }

  // List shop order status
  public listOrderSummaryReportStatus(): void {
    let listOrderSummaryReportStatusObservableArray = new ObservableArray();
    this.listOrderSummaryReportStatusSource.next(listOrderSummaryReportStatusObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/orderSummaryReport/dropdown/list/shopOrderStatus", this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listOrderSummaryReportStatusObservableArray.push({
              Id: results[i].Id,
              ShopOrderStatusCode: results[i].ShopOrderStatusCode,
              ShopOrderStatus: results[i].ShopOrderStatus
            });
          }
        }

        this.listOrderSummaryReportStatusSource.next(listOrderSummaryReportStatusObservableArray);
      }
    );
  }

  // List shop order 
  public listOrderSummaryReport(startDate: string, endDate: string, shopGroupId: number, shopOrderStatusId: number): void {
    let listOrderSummaryReportObservableArray = new ObservableArray();
    this.listOrderSummaryReportSource.next(listOrderSummaryReportObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/orderSummaryReport/list/" + startDate + "/" + endDate + "/" + shopGroupId + "/" + shopOrderStatusId, this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listOrderSummaryReportObservableArray.push({
              Id: results[i].Id,
              SPDate: results[i].SPDate,
              SPNumber: results[i].SPNumber,
              Item: results[i].Item,
              Quantity: results[i].Quantity,
              Amount: results[i].Amount,
              Particulars: results[i].Particulars,
              ShopGroup: results[i].ShopGroup,
              ShopOrderStatus: results[i].ShopOrderStatus,
              ShopOrderStatusDate: results[i].ShopOrderStatusDate
            });
          }
        }

        this.listOrderSummaryReportSource.next(listOrderSummaryReportObservableArray);
      }
    );
  }
}
