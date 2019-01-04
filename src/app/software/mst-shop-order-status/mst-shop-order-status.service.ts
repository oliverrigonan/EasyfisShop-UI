import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
import { ObservableArray } from 'wijmo/wijmo';
import { Subject } from 'rxjs';
import { MstShopOrderStatusModel } from './mst-shop-order-status.model';

@Injectable({
  providedIn: 'root'
})
export class MstShopOrderStatusService {
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
  public listShopOrderStatusSource = new Subject<ObservableArray>();
  public listShopOrderStatusObservable = this.listShopOrderStatusSource.asObservable();
  public saveShopOrderStatusSource = new Subject<string[]>();
  public saveShopOrderStatusObservable = this.saveShopOrderStatusSource.asObservable();
  public deleteShopOrderStatusSource = new Subject<string[]>();
  public deleteShopOrderStatusObservable = this.deleteShopOrderStatusSource.asObservable();

  // List shop order status
  public listShopOrderStatus(): void {
    let listShopOrderStatusObservableArray = new ObservableArray();
    this.listShopOrderStatusSource.next(listShopOrderStatusObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/shopOrderStatus/list", this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listShopOrderStatusObservableArray.push({
              Id: results[i].Id,
              ShopOrderStatusCode: results[i].ShopOrderStatusCode,
              ShopOrderStatus: results[i].ShopOrderStatus,
              IsLocked: results[i].IsLocked,
              CreatedBy: results[i].CreatedBy,
              CreatedDateTime: results[i].CreatedDateTime,
              UpdatedBy: results[i].UpdatedBy,
              UpdatedDateTime: results[i].UpdatedDateTime
            });
          }
        }

        this.listShopOrderStatusSource.next(listShopOrderStatusObservableArray);
      }
    );
  }

  // Save shop order status
  public saveShopOrderStatus(objShopOrderStatus: MstShopOrderStatusModel): void {
    if (objShopOrderStatus.Id == 0) {
      this.httpClient.post(this.defaultAPIURLHost + "/api/shopOrderStatus/add", JSON.stringify(objShopOrderStatus), this.options).subscribe(
        response => {
          let responseResults: string[] = ["success", ""];
          this.saveShopOrderStatusSource.next(responseResults);
        },
        error => {
          let errorResults: string[] = ["failed", error["error"]];
          this.saveShopOrderStatusSource.next(errorResults);
        }
      )
    } else {
      this.httpClient.put(this.defaultAPIURLHost + "/api/shopOrderStatus/update", JSON.stringify(objShopOrderStatus), this.options).subscribe(
        response => {
          let responseResults: string[] = ["success", ""];
          this.saveShopOrderStatusSource.next(responseResults);
        },
        error => {
          let errorResults: string[] = ["failed", error["error"]];
          this.saveShopOrderStatusSource.next(errorResults);
        }
      )
    }
  }

  // Delete shop order status
  public deleteShopOrderStatus(id: number): void {
    this.httpClient.delete(this.defaultAPIURLHost + "/api/shopOrderStatus/delete?id=" + id, this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.deleteShopOrderStatusSource.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.deleteShopOrderStatusSource.next(errorResults);
      }
    )
  }
}