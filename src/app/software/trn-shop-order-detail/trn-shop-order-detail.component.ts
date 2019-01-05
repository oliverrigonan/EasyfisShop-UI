import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TrnShopOrderDetailService } from './trn-shop-order-detail.service';
import { TrnShopOrderDetailModel } from './trn-shop-order-detail.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trn-shop-order-detail',
  templateUrl: './trn-shop-order-detail.component.html',
  styleUrls: ['./trn-shop-order-detail.component.css']
})
export class TrnShopOrderDetailComponent implements OnInit {
  constructor(
    private trnShopOrderDetailService: TrnShopOrderDetailService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  public trnShopOrderDetailModel: TrnShopOrderDetailModel = {
    Id: 0,
    Branch: "",
    SPDate: new Date(),
    SPNumber: "",
    ItemId: 0,
    Quantity: 0,
    UnitId: 0,
    Amount: 0,
    ShopOrderStatusId: 0,
    ShopOrderStatusDate: new Date(),
    ShopGroupId: 0,
    Particulars: "",
    Status: "",
    IsLocked: "",
    CreatedBy: "",
    CreatedDateTime: "",
    UpdatedBy: "",
    UpdatedDateTime: ""
  };

  // Subscriptions
  public cboItemSubscription: any;
  public cboItemObservableArray: ObservableArray = new ObservableArray();
  @ViewChild('cboShopOrderItem') cboShopOrderItem: WjComboBox;
  public cboShopGroupSubscription: any;
  public cboShopGroupObservableArray: ObservableArray = new ObservableArray();
  public cboShopOrderStatusSubscription: any;
  public cboShopOrderStatusObservableArray: ObservableArray = new ObservableArray();
  public detailShopOrderSubscription: any;
  public lockShopOrderSubscription: any;
  public unlockShopOrderSubscription: any;

  public isLocked: boolean = false;

  // Create combo box item
  public createCboItem(): void {
    this.trnShopOrderDetailService.listItem();
    this.cboItemSubscription = this.trnShopOrderDetailService.listItemObservable.subscribe(
      data => {
        let itemObservableArray = new ObservableArray();

        if (data != null) {
          for (var i = 0; i <= data.length - 1; i++) {
            itemObservableArray.push({
              Id: data[i].Id,
              Item: data[i].Item,
              Code: data[i].Code,
              ManualCode: data[i].ManualCode,
              UnitId: data[i].UnitId
            });
          }
        }

        this.cboItemObservableArray = itemObservableArray;
        if (this.cboItemObservableArray.length > 0) {
          this.createCboShopGroup();
        }

        if (this.cboItemSubscription != null) this.cboItemSubscription.unsubscribe();
      }
    );
  }

  // Create combo box shop group
  public createCboShopGroup(): void {
    this.trnShopOrderDetailService.listShopGroup();
    this.cboShopGroupSubscription = this.trnShopOrderDetailService.listShopGroupObservable.subscribe(
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
          this.createCboShopOrderStatus();
        }

        if (this.cboShopGroupSubscription != null) this.cboShopGroupSubscription.unsubscribe();
      }
    );
  }

  // Create combo box shop order status
  public createCboShopOrderStatus(): void {
    this.trnShopOrderDetailService.listShopOrderStatus();
    this.cboShopOrderStatusSubscription = this.trnShopOrderDetailService.listShopOrderStatusObservable.subscribe(
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

        this.cboShopOrderStatusObservableArray = shopOrderStatusObservableArray;
        if (this.cboShopOrderStatusObservableArray.length > 0) {
          setTimeout(() => {
            this.detailShopOrder();
          }, 100);
        }

        if (this.cboShopOrderStatusSubscription != null) this.cboShopOrderStatusSubscription.unsubscribe();
      }
    );
  }

  // Detail shop order
  public detailShopOrder(): void {
    let id: number = 0;
    this.activatedRoute.params.subscribe(params => { id = params["id"]; });

    this.trnShopOrderDetailService.detailShopGroup(id);
    this.detailShopOrderSubscription = this.trnShopOrderDetailService.detailShopOrderObservable.subscribe(
      data => {
        if (data != null) {
          this.trnShopOrderDetailModel.Id = data.Id;
          this.trnShopOrderDetailModel.Branch = data.Branch;
          this.trnShopOrderDetailModel.SPNumber = data.SPNumber;
          this.trnShopOrderDetailModel.SPDate = new Date(data.SPDate);
          this.trnShopOrderDetailModel.ItemId = data.ItemId;
          this.trnShopOrderDetailModel.UnitId = this.cboShopOrderItem.selectedItem["UnitId"];
          this.trnShopOrderDetailModel.Quantity = data.Quantity;
          this.trnShopOrderDetailModel.Amount = data.Amount;
          this.trnShopOrderDetailModel.ShopGroupId = data.ShopGroupId;
          this.trnShopOrderDetailModel.Particulars = data.Particulars;
          this.trnShopOrderDetailModel.ShopOrderStatusId = data.ShopOrderStatusId;
          this.trnShopOrderDetailModel.ShopOrderStatusDate = new Date(data.ShopOrderStatusDate);
          this.trnShopOrderDetailModel.IsLocked = data.IsLocked;
          this.trnShopOrderDetailModel.CreatedBy = data.CreatedBy;
          this.trnShopOrderDetailModel.CreatedDateTime = data.CreatedDateTime;
          this.trnShopOrderDetailModel.UpdatedBy = data.UpdatedBy;
          this.trnShopOrderDetailModel.UpdatedDateTime = data.UpdatedDateTime;

          if (data.IsLocked) {
            this.isLocked = true;
          }
        }

        if (this.detailShopOrderSubscription != null) this.detailShopOrderSubscription.unsubscribe();
      }
    );
  }

  // Lock shop order
  public btnLockShopOrderClick(): void {
    let id: number = 0;
    this.activatedRoute.params.subscribe(params => { id = params["id"]; });

    let btnLockShopOrder: Element = document.getElementById("btnLockShopOrder");
    let btnUnlockShopOrder: Element = document.getElementById("btnUnlockShopOrder");
    (<HTMLButtonElement>btnLockShopOrder).disabled = true;
    (<HTMLButtonElement>btnUnlockShopOrder).disabled = true;

    this.trnShopOrderDetailService.lockShopGroup(this.trnShopOrderDetailModel);
    this.lockShopOrderSubscription = this.trnShopOrderDetailService.lockShopOrderObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("Shop order was successfully locked.", "Success");

          setTimeout(() => {
            this.isLocked = true;
          }, 500);
        } else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");
        }

        if (this.lockShopOrderSubscription != null) this.lockShopOrderSubscription.unsubscribe();
      }
    );
  }

  // Unlock shop order
  public btnUnlockShopOrderClick(): void {
    let id: number = 0;
    this.activatedRoute.params.subscribe(params => { id = params["id"]; });

    let btnLockShopOrder: Element = document.getElementById("btnLockShopOrder");
    let btnUnlockShopOrder: Element = document.getElementById("btnUnlockShopOrder");
    (<HTMLButtonElement>btnLockShopOrder).disabled = true;
    (<HTMLButtonElement>btnUnlockShopOrder).disabled = true;

    this.trnShopOrderDetailService.unlockShopGroup(id);
    this.unlockShopOrderSubscription = this.trnShopOrderDetailService.unlockShopOrderObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("Shop order was successfully unlocked.", "Success");

          setTimeout(() => {
            this.isLocked = false;
          }, 500);
        } else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");
        }

        if (this.unlockShopOrderSubscription != null) this.unlockShopOrderSubscription.unsubscribe();
      }
    );
  }

  // On page load
  ngOnInit() {
    this.createCboItem();
  }

  // On page destroy
  ngOnDestroy() {
    if (this.cboItemSubscription != null) this.cboItemSubscription.unsubscribe();
    if (this.cboShopGroupSubscription != null) this.cboShopGroupSubscription.unsubscribe();
    if (this.cboShopOrderStatusSubscription != null) this.cboShopOrderStatusSubscription.unsubscribe();
    if (this.detailShopOrderSubscription != null) this.detailShopOrderSubscription.unsubscribe();
    if (this.lockShopOrderSubscription != null) this.lockShopOrderSubscription.unsubscribe();
    if (this.unlockShopOrderSubscription != null) this.unlockShopOrderSubscription.unsubscribe();
  }
}
