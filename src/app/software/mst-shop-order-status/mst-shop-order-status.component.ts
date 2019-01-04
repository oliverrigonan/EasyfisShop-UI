import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MstShopOrderStatusService } from './mst-shop-order-status.service';
import { MstShopOrderStatusModel } from './mst-shop-order-status.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mst-shop-order-status',
  templateUrl: './mst-shop-order-status.component.html',
  styleUrls: ['./mst-shop-order-status.component.css']
})
export class MstShopOrderStatusComponent implements OnInit {
  constructor(
    private mstShopOrderStatusService: MstShopOrderStatusService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();

  public listShopOrderStatusSubscription: any;
  public listShopOrderStatusObservableArray: ObservableArray = new ObservableArray();
  public listShopOrderStatusCollectionView: CollectionView = new CollectionView(this.listShopOrderStatusObservableArray);
  public listShopPageIndex: number = 15;
  @ViewChild('listShopOrderStatusFlexGrid') listShopOrderStatusFlexGrid: WjFlexGrid;

  public saveShopOrderStatusSubscription: any;
  public deleteShopOrderStatusSubscription: any;

  public mstShopOrderStatus: MstShopOrderStatusModel = {
    Id: 0,
    ShopOrderStatusCode: "",
    ShopOrderStatus: ""
  };

  public shopOrderStatusModalTitle: String = "";
  public shopOrderStatusModalRef: BsModalRef;

  public shopOrderStatusDeleteModalRef: BsModalRef;

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

    this.listShopOrderStatus();
  }

  public cboShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.listShopPageIndex = selectedValue;

    this.listShopOrderStatusCollectionView.pageSize = this.listShopPageIndex;
    this.listShopOrderStatusCollectionView.refresh();
    this.listShopOrderStatusCollectionView.refresh();
  }

  // List shop order status
  public listShopOrderStatus(): void {
    this.listShopOrderStatusObservableArray = new ObservableArray();
    this.listShopOrderStatusCollectionView = new CollectionView(this.listShopOrderStatusObservableArray);
    this.listShopOrderStatusCollectionView.pageSize = 15;
    this.listShopOrderStatusCollectionView.trackChanges = true;
    this.listShopOrderStatusCollectionView.refresh();
    this.listShopOrderStatusFlexGrid.refresh();

    this.mstShopOrderStatusService.listShopOrderStatus();
    this.listShopOrderStatusSubscription = this.mstShopOrderStatusService.listShopOrderStatusObservable.subscribe(
      data => {
        if (data.length > 0) {
          this.listShopOrderStatusObservableArray = data;
          this.listShopOrderStatusCollectionView = new CollectionView(this.listShopOrderStatusObservableArray);
          this.listShopOrderStatusCollectionView.pageSize = this.listShopPageIndex;
          this.listShopOrderStatusCollectionView.trackChanges = true;
          this.listShopOrderStatusCollectionView.refresh();
          this.listShopOrderStatusFlexGrid.refresh();
        }

        if (this.listShopOrderStatusSubscription != null) this.listShopOrderStatusSubscription.unsubscribe();
      }
    );
  }

  // Open shop order status modal
  public btnOpenShopOrderStatusModalClick(shopOrderStatusModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.shopOrderStatusModalRef = this.modalService.show(shopOrderStatusModalTemplate, { class: "" });

    let inpShopOrderStatusCode: Element = document.getElementById("inpShopOrderStatusCode");
    let inpShopOrderStatusName: Element = document.getElementById("inpShopOrderStatusName");
    (<HTMLInputElement>inpShopOrderStatusCode).disabled = false;
    (<HTMLInputElement>inpShopOrderStatusName).disabled = false;

    let btnSaveShopOrderStatus: Element = document.getElementById("btnSaveShopOrderStatus");
    let btnCloseShopOrderStatusModal: Element = document.getElementById("btnCloseShopOrderStatusModal");
    (<HTMLButtonElement>btnSaveShopOrderStatus).disabled = false;
    (<HTMLButtonElement>btnCloseShopOrderStatusModal).disabled = false;

    if (isNew) {
      this.shopOrderStatusModalTitle = "New status";

      this.mstShopOrderStatus.Id = 0;
      this.mstShopOrderStatus.ShopOrderStatusCode = "";
      this.mstShopOrderStatus.ShopOrderStatus = "";
    } else {
      this.shopOrderStatusModalTitle = "Edit status";

      let currentShopOrderStatus = this.listShopOrderStatusCollectionView.currentItem;
      this.mstShopOrderStatus.Id = currentShopOrderStatus.Id;
      this.mstShopOrderStatus.ShopOrderStatusCode = currentShopOrderStatus.ShopOrderStatusCode;
      this.mstShopOrderStatus.ShopOrderStatus = currentShopOrderStatus.ShopOrderStatus;
    }
  }

  // Save shop order status
  public btnSaveShopOrderStatusClick(): void {
    let inpShopOrderStatusCode: Element = document.getElementById("inpShopOrderStatusCode");
    let inpShopOrderStatusName: Element = document.getElementById("inpShopOrderStatusName");
    (<HTMLInputElement>inpShopOrderStatusCode).disabled = true;
    (<HTMLInputElement>inpShopOrderStatusName).disabled = true;

    let btnSaveShopOrderStatus: Element = document.getElementById("btnSaveShopOrderStatus");
    let btnCloseShopOrderStatusModal: Element = document.getElementById("btnCloseShopOrderStatusModal");
    (<HTMLButtonElement>btnSaveShopOrderStatus).disabled = true;
    (<HTMLButtonElement>btnCloseShopOrderStatusModal).disabled = true;

    if (this.mstShopOrderStatus.ShopOrderStatusCode !== "" && this.mstShopOrderStatus.ShopOrderStatus !== "") {
      this.mstShopOrderStatusService.saveShopOrderStatus(this.mstShopOrderStatus);
      this.saveShopOrderStatusSubscription = this.mstShopOrderStatusService.saveShopOrderStatusObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.toastr.success("Shop order status was successfully saved.", "Success");

            this.shopOrderStatusModalRef.hide();
            this.listShopOrderStatus();
          } else if (data[0] == "failed") {
            this.toastr.error(data[1], "Error");

            (<HTMLButtonElement>btnSaveShopOrderStatus).disabled = false;
            (<HTMLButtonElement>btnCloseShopOrderStatusModal).disabled = false;
          }

          if (this.saveShopOrderStatusSubscription != null) this.saveShopOrderStatusSubscription.unsubscribe();
        }
      );
    } else {
      this.toastr.error("Please don't leave empty fields.", "Error");

      (<HTMLInputElement>inpShopOrderStatusCode).disabled = false;
      (<HTMLInputElement>inpShopOrderStatusName).disabled = false;

      (<HTMLButtonElement>btnSaveShopOrderStatus).disabled = false;
      (<HTMLButtonElement>btnCloseShopOrderStatusModal).disabled = false;
    }
  }

  // Delete shop order status
  public btnDeleteShopOrderStatusClick(shopOrderStatusDeleteModalTemplate: TemplateRef<any>): void {
    this.shopOrderStatusDeleteModalRef = this.modalService.show(shopOrderStatusDeleteModalTemplate, { class: "modal-sm" });

    let btnConfirmDeleteShopOrderStatus: Element = document.getElementById("btnConfirmDeleteShopOrderStatus");
    let btnCloseConfirmDeleteShopOrderStatusModal: Element = document.getElementById("btnCloseConfirmDeleteShopOrderStatusModal");
    (<HTMLButtonElement>btnConfirmDeleteShopOrderStatus).disabled = false;
    (<HTMLButtonElement>btnCloseConfirmDeleteShopOrderStatusModal).disabled = false;

    let currentShopOrderStatus = this.listShopOrderStatusCollectionView.currentItem;
    this.mstShopOrderStatus.Id = currentShopOrderStatus.Id;
  }

  // Confirm delete shop order status
  public btnConfirmDeleteShopOrderStatusClick(): void {
    let btnConfirmDeleteShopOrderStatus: Element = document.getElementById("btnConfirmDeleteShopOrderStatus");
    let btnCloseConfirmDeleteShopOrderStatusModal: Element = document.getElementById("btnCloseConfirmDeleteShopOrderStatusModal");
    (<HTMLButtonElement>btnConfirmDeleteShopOrderStatus).disabled = true;
    (<HTMLButtonElement>btnCloseConfirmDeleteShopOrderStatusModal).disabled = true;

    this.mstShopOrderStatusService.deleteShopOrderStatus(this.mstShopOrderStatus.Id);
    this.deleteShopOrderStatusSubscription = this.mstShopOrderStatusService.deleteShopOrderStatusObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("Shop order status was successfully deleted.", "Success");

          this.shopOrderStatusDeleteModalRef.hide();
          this.listShopOrderStatus();
        } else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");

          (<HTMLButtonElement>btnConfirmDeleteShopOrderStatus).disabled = false;
          (<HTMLButtonElement>btnCloseConfirmDeleteShopOrderStatusModal).disabled = false;
        }

        if (this.deleteShopOrderStatusSubscription != null) this.deleteShopOrderStatusSubscription.unsubscribe();
      }
    );
  }

  // On page load
  ngOnInit() {
    this.createCboShowNumberOfRows();
  }

  // On page destroy
  ngOnDestroy() {
    if (this.listShopOrderStatusSubscription != null) this.listShopOrderStatusSubscription.unsubscribe();
    if (this.saveShopOrderStatusSubscription != null) this.saveShopOrderStatusSubscription.unsubscribe();
    if (this.deleteShopOrderStatusSubscription != null) this.deleteShopOrderStatusSubscription.unsubscribe();
  }
}
