import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TrnShopOrderDetailService } from './trn-shop-order-detail.service';
import { TrnShopOrderDetailModel } from './trn-shop-order-detail.model';
import { TrnShopOrderLineModel } from './trn-shop-order-line.model';

import { ToastrService } from 'ngx-toastr';

import { SoftwareUserFormService } from '../software-user-form.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private softwareUserFormService: SoftwareUserFormService,
    private router: Router
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

  public shopOrderLineModalRef: BsModalRef;
  public shopOrderLineDeleteModalRef: BsModalRef;

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();

  // Shop order line
  public listShopOrderLineSubscription: any;
  public listShopOrderLineObservableArray: ObservableArray = new ObservableArray();
  public listShopOrderLineCollectionView: CollectionView = new CollectionView(this.listShopOrderLineObservableArray);
  public listShopOrderLinePageIndex: number = 15;
  @ViewChild('listShopOrderLineFlexGrid') listShopOrderLineFlexGrid: WjFlexGrid;

  public saveShopOrderLineSubscription: any;
  public deleteShopOrderLineSubscription: any;

  public shopOrderLineModalTitle: string;

  public isShopOrderLineActivityDateDisabled: boolean = false;
  public trnShopOrderLineModel: TrnShopOrderLineModel = {
    Id: 0,
    SPId: 0,
    ActivityDate: new Date(),
    Activity: "",
    User: ""
  };

  public getUserFormsSubscription: any;
  public isLoadingSpinnerHidden: boolean = false;
  public isContentHidden: boolean = true;

  public isAddButtonHide: boolean = true;
  public isEditButtonHide: boolean = true;
  public isDeleteButtonHide: boolean = true;
  public isLockButtonHide: boolean = true;
  public isUnlockButtonHide: boolean = true;

  public isShowEditColumn: boolean = false;
  public isShowDeleteColumn: boolean = false;

  public isProgressBarHidden = false;

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

        this.listShopOrderLine();
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
  }

  public cboShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.listShopOrderLinePageIndex = selectedValue;

    this.listShopOrderLineCollectionView.pageSize = this.listShopOrderLinePageIndex;
    this.listShopOrderLineCollectionView.refresh();
    this.listShopOrderLineCollectionView.refresh();
  }

  // List shop order line
  public listShopOrderLine(): void {
    this.listShopOrderLineObservableArray = new ObservableArray();
    this.listShopOrderLineCollectionView = new CollectionView(this.listShopOrderLineObservableArray);
    this.listShopOrderLineCollectionView.pageSize = 15;
    this.listShopOrderLineCollectionView.trackChanges = true;
    this.listShopOrderLineCollectionView.refresh();
    this.listShopOrderLineFlexGrid.refresh();

    let id: number = 0;
    this.activatedRoute.params.subscribe(params => { id = params["id"]; });

    this.isProgressBarHidden = false;

    this.trnShopOrderDetailService.listShopOrderLine(id.toString());
    this.listShopOrderLineSubscription = this.trnShopOrderDetailService.listShopOrderLineObservable.subscribe(
      data => {
        if (data.length > 0) {
          this.listShopOrderLineObservableArray = data;
          this.listShopOrderLineCollectionView = new CollectionView(this.listShopOrderLineObservableArray);
          this.listShopOrderLineCollectionView.pageSize = this.listShopOrderLinePageIndex;
          this.listShopOrderLineCollectionView.trackChanges = true;
          this.listShopOrderLineCollectionView.refresh();
          this.listShopOrderLineFlexGrid.refresh();
        }

        this.isProgressBarHidden = true;
        if (this.listShopOrderLineSubscription != null) this.listShopOrderLineSubscription.unsubscribe();
      }
    );
  }

  // Open shop order line modal
  public btnOpenShopOrderLineModalClick(shopOrderLineModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.shopOrderLineModalRef = this.modalService.show(shopOrderLineModalTemplate, { class: "modal-lg" });

    let inpActivity: Element = document.getElementById("inpActivity");
    this.isShopOrderLineActivityDateDisabled = false;
    (<HTMLInputElement>inpActivity).disabled = false;

    let btnSaveShopOrderLine: Element = document.getElementById("btnSaveShopOrderLine");
    let btnCloseShopOrderLineModal: Element = document.getElementById("btnCloseShopOrderLineModal");
    (<HTMLButtonElement>btnSaveShopOrderLine).disabled = false;
    (<HTMLButtonElement>btnCloseShopOrderLineModal).disabled = false;

    if (isNew) {
      this.shopOrderLineModalTitle = "New Activity";

      let SPId: number = 0;
      this.activatedRoute.params.subscribe(params => { SPId = params["id"]; });

      this.trnShopOrderLineModel.Id = 0;
      this.trnShopOrderLineModel.SPId = SPId;
      this.trnShopOrderLineModel.ActivityDate = new Date();
      this.trnShopOrderLineModel.Activity = "";
    } else {
      this.shopOrderLineModalTitle = "Edit Activity";

      let currentShopOrderLine = this.listShopOrderLineCollectionView.currentItem;
      this.trnShopOrderLineModel.Id = currentShopOrderLine.Id;
      this.trnShopOrderLineModel.SPId = currentShopOrderLine.SPId;
      this.trnShopOrderLineModel.ActivityDate = new Date(currentShopOrderLine.ActivityDate);
      this.trnShopOrderLineModel.Activity = currentShopOrderLine.Activity;
    }
  }

  // Save shop order line modal
  public btnSaveShopOrderLineClick() {
    let inpActivity: Element = document.getElementById("inpActivity");
    this.isShopOrderLineActivityDateDisabled = true;
    (<HTMLInputElement>inpActivity).disabled = true;

    let btnSaveShopOrderLine: Element = document.getElementById("btnSaveShopOrderLine");
    let btnCloseShopOrderLineModal: Element = document.getElementById("btnCloseShopOrderLineModal");
    (<HTMLButtonElement>btnSaveShopOrderLine).disabled = true;
    (<HTMLButtonElement>btnCloseShopOrderLineModal).disabled = true;

    if (this.trnShopOrderLineModel.Activity !== "") {
      this.trnShopOrderDetailService.saveShopOrderLine(this.trnShopOrderLineModel);
      this.saveShopOrderLineSubscription = this.trnShopOrderDetailService.saveShopOrderLineObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.toastr.success("Shop order line was successfully saved.", "Success");

            this.shopOrderLineModalRef.hide();
            this.listShopOrderLine();
          } else if (data[0] == "failed") {
            this.toastr.error(data[1], "Error");

            this.isShopOrderLineActivityDateDisabled = false;
            (<HTMLInputElement>inpActivity).disabled = false;

            (<HTMLButtonElement>btnSaveShopOrderLine).disabled = false;
            (<HTMLButtonElement>btnCloseShopOrderLineModal).disabled = false;
          }

          if (this.saveShopOrderLineSubscription != null) this.saveShopOrderLineSubscription.unsubscribe();
        }
      );
    } else {
      this.toastr.error("Please don't leave empty fields.", "Error");

      this.isShopOrderLineActivityDateDisabled = false;
      (<HTMLInputElement>inpActivity).disabled = false;

      (<HTMLButtonElement>btnSaveShopOrderLine).disabled = false;
      (<HTMLButtonElement>btnCloseShopOrderLineModal).disabled = false;
    }
  }

  // Delete shop order line modal
  public btnDeleteShopOrderLineClick(shopOrderLineDeleteModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.shopOrderLineDeleteModalRef = this.modalService.show(shopOrderLineDeleteModalTemplate, { class: "modal-sm" });

    let btnConfirmDeleteShopOrderLine: Element = document.getElementById("btnConfirmDeleteShopOrderLine");
    let btnCloseConfirmDeleteShopOrderLineModal: Element = document.getElementById("btnCloseConfirmDeleteShopOrderLineModal");
    (<HTMLButtonElement>btnConfirmDeleteShopOrderLine).disabled = false;
    (<HTMLButtonElement>btnCloseConfirmDeleteShopOrderLineModal).disabled = false;
  }

  // Delete confirm shop order line modal
  public btnConfirmDeleteShopOrderLineClick(): void {
    let btnConfirmDeleteShopOrderLine: Element = document.getElementById("btnConfirmDeleteShopOrderLine");
    let btnCloseConfirmDeleteShopOrderLineModal: Element = document.getElementById("btnCloseConfirmDeleteShopOrderLineModal");
    (<HTMLButtonElement>btnConfirmDeleteShopOrderLine).disabled = true;
    (<HTMLButtonElement>btnCloseConfirmDeleteShopOrderLineModal).disabled = true;

    let currentShopOrderIne = this.listShopOrderLineCollectionView.currentItem;
    this.trnShopOrderDetailService.deleteShopOrderLine(currentShopOrderIne.Id);
    this.deleteShopOrderLineSubscription = this.trnShopOrderDetailService.deleteShopOrderLineObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("Shop order was successfully deleted.", "Success");

          this.shopOrderLineDeleteModalRef.hide();
          this.listShopOrderLine();
        } else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");

          (<HTMLButtonElement>btnConfirmDeleteShopOrderLine).disabled = false;
          (<HTMLButtonElement>btnCloseConfirmDeleteShopOrderLineModal).disabled = false;
        }

        if (this.deleteShopOrderLineSubscription != null) this.deleteShopOrderLineSubscription.unsubscribe();
      }
    );
  }

  // On page load
  ngOnInit() {
    this.createCboShowNumberOfRows();
    setTimeout(() => {
      this.softwareUserFormService.getCurrentForm("ShopOrderDetail");
      this.getUserFormsSubscription = this.softwareUserFormService.getCurrentUserFormsObservable.subscribe(
        data => {
          if (data != null) {
            this.isLoadingSpinnerHidden = true;
            this.isContentHidden = false;

            if (data.CanAdd) {
              this.isAddButtonHide = false;
            }

            if (data.CanAdd) {
              this.isAddButtonHide = false;
            }

            if (data.CanEdit) {
              this.isEditButtonHide = false;
              this.isShowEditColumn = true;
            }

            if (data.CanLock) {
              this.isLockButtonHide = false;
            }

            if (data.CanUnlock) {
              this.isUnlockButtonHide = false;
            }

            if (data.CanDelete) {
              this.isDeleteButtonHide = false;
              this.isShowDeleteColumn = true;
            }

            this.createCboItem();
          } else {
            this.router.navigateByUrl("/software/err-forbidden", { skipLocationChange: true });
          }

          if (this.getUserFormsSubscription != null) this.getUserFormsSubscription.unsubscribe();
        }
      );
    }, 1000);
  }

  // On page destroy
  ngOnDestroy() {
    if (this.cboItemSubscription != null) this.cboItemSubscription.unsubscribe();
    if (this.cboShopGroupSubscription != null) this.cboShopGroupSubscription.unsubscribe();
    if (this.cboShopOrderStatusSubscription != null) this.cboShopOrderStatusSubscription.unsubscribe();
    if (this.detailShopOrderSubscription != null) this.detailShopOrderSubscription.unsubscribe();
    if (this.lockShopOrderSubscription != null) this.lockShopOrderSubscription.unsubscribe();
    if (this.unlockShopOrderSubscription != null) this.unlockShopOrderSubscription.unsubscribe();
    if (this.listShopOrderLineSubscription != null) this.listShopOrderLineSubscription.unsubscribe();
    if (this.saveShopOrderLineSubscription != null) this.saveShopOrderLineSubscription.unsubscribe();
    if (this.deleteShopOrderLineSubscription != null) this.deleteShopOrderLineSubscription.unsubscribe();
    if (this.getUserFormsSubscription != null) this.getUserFormsSubscription.unsubscribe();
  }
}
