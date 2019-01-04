import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
import { ObservableArray } from 'wijmo/wijmo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrnShopOrderListService {
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
  public listShopOrderStatusSource = new Subject<ObservableArray>();
  public listShopOrderStatusObservable = this.listShopOrderStatusSource.asObservable();
  public listShopOrderSource = new Subject<ObservableArray>();
  public listShopOrderObservable = this.listShopOrderSource.asObservable();
  public addShopOrderSource = new Subject<string[]>();
  public addShopOrderObservable = this.addShopOrderSource.asObservable();
  public deleteShopOrderSource = new Subject<string[]>();
  public deleteShopOrderObservable = this.deleteShopOrderSource.asObservable();

  // List shop group
  public listShopGroup(): void {
    let listShopGroupObservableArray = new ObservableArray();
    this.listShopGroupSource.next(listShopGroupObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/shopOrder/dropdown/list/shopOrderGroup", this.options).subscribe(
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
  public listShopOrderStatus(): void {
    let listShopOrderStatusObservableArray = new ObservableArray();
    this.listShopOrderStatusSource.next(listShopOrderStatusObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/shopOrder/dropdown/list/shopOrderStatus", this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listShopOrderStatusObservableArray.push({
              Id: results[i].Id,
              ShopOrderStatusCode: results[i].ShopOrderStatusCode,
              ShopOrderStatus: results[i].ShopOrderStatus
            });
          }
        }

        this.listShopOrderStatusSource.next(listShopOrderStatusObservableArray);
      }
    );
  }

  // List shop order 
  public listShopOrder(startDate: string, endDate: string, shopGroupId: number, shopOrderStatusId: number): void {
    let listShopOrderObservableArray = new ObservableArray();
    this.listShopOrderSource.next(listShopOrderObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/shopOrder/list/" + startDate + "/" + endDate + "/" + shopGroupId + "/" + shopOrderStatusId, this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listShopOrderObservableArray.push({
              Id: results[i].Id,
              SPDate: results[i].SPDate,
              SPNumber: results[i].SPNumber,
              Item: results[i].Item,
              Quantity: results[i].Quantity,
              Amount: results[i].Amount,
              Particulars: results[i].Particulars,
              IsLocked: results[i].IsLocked,
              CreatedBy: results[i].CreatedBy,
              CreatedDateTime: results[i].CreatedDateTime,
              UpdatedBy: results[i].UpdatedBy,
              UpdatedDateTime: results[i].UpdatedDateTime
            });
          }
        }

        this.listShopOrderSource.next(listShopOrderObservableArray);
      }
    );
  }

  // Add shop order 
  public addShopOrder(): void {
    this.httpClient.post(this.defaultAPIURLHost + "/api/shopOrder/add", "", this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", response.toString()];
        this.addShopOrderSource.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.addShopOrderSource.next(errorResults);
      }
    )
  }

  // Delete shop order 
  public deleteShopOrder(id: number): void {
    this.httpClient.delete(this.defaultAPIURLHost + "/api/shopOrder/delete?id=" + id, this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.deleteShopOrderSource.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.deleteShopOrderSource.next(errorResults);
      }
    )
  }
}
