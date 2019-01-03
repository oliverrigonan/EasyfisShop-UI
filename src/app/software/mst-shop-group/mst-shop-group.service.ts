import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
import { ObservableArray } from 'wijmo/wijmo';
import { Subject } from 'rxjs';
import { MstShopGroupModel } from './mst-shop-group.model';

@Injectable({
  providedIn: 'root'
})
export class MstShopGroupService {
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
  public saveShopGroupSource = new Subject<string[]>();
  public saveShopGroupObservable = this.saveShopGroupSource.asObservable();
  public deleteShopGroupSource = new Subject<string[]>();
  public deleteShopGroupObservable = this.deleteShopGroupSource.asObservable();

  // List shop group
  public listShopGroup(): void {
    let listShopGroupObservableArray = new ObservableArray();
    this.listShopGroupSource.next(listShopGroupObservableArray);

    this.httpClient.get(this.defaultAPIURLHost + "/api/shopGroup/list", this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            listShopGroupObservableArray.push({
              Id: results[i].Id,
              ShopGroupCode: results[i].ShopGroupCode,
              ShopGroup: results[i].ShopGroup,
              IsLocked: results[i].IsLocked,
              CreatedBy: results[i].CreatedBy,
              CreatedDateTime: results[i].CreatedDateTime,
              UpdatedBy: results[i].UpdatedBy,
              UpdatedDateTime: results[i].UpdatedDateTime
            });
          }
        }

        this.listShopGroupSource.next(listShopGroupObservableArray);
      }
    );
  }

  // Save shop group
  public saveShopGroup(objShopGroup: MstShopGroupModel): void {
    if (objShopGroup.Id == 0) {
      this.httpClient.post(this.defaultAPIURLHost + "/api/shopGroup/add", JSON.stringify(objShopGroup), this.options).subscribe(
        response => {
          let responseResults: string[] = ["success", ""];
          this.saveShopGroupSource.next(responseResults);
        },
        error => {
          let errorResults: string[] = ["failed", error["error"]];
          this.saveShopGroupSource.next(errorResults);
        }
      )
    } else {
      this.httpClient.put(this.defaultAPIURLHost + "/api/shopGroup/update", JSON.stringify(objShopGroup), this.options).subscribe(
        response => {
          let responseResults: string[] = ["success", ""];
          this.saveShopGroupSource.next(responseResults);
        },
        error => {
          let errorResults: string[] = ["failed", error["error"]];
          this.saveShopGroupSource.next(errorResults);
        }
      )
    }
  }

  // Delete shop group
  public deleteShopGroup(id: number): void {
    this.httpClient.delete(this.defaultAPIURLHost + "/api/shopGroup/delete?id=" + id, this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.deleteShopGroupSource.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.deleteShopGroupSource.next(errorResults);
      }
    )
  }
}