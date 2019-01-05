import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MstShopGroupService } from './mst-shop-group.service';
import { MstShopGroupModel } from './mst-shop-group.model';

import { ToastrService } from 'ngx-toastr';

import { SoftwareUserFormService } from '../software-user-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mst-shop-group',
  templateUrl: './mst-shop-group.component.html',
  styleUrls: ['./mst-shop-group.component.css']
})
export class MstShopGroupComponent implements OnInit {
  constructor(
    private mstShopGroupService: MstShopGroupService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private softwareUserFormService: SoftwareUserFormService,
    private router: Router
  ) { }

  public cboShowNumberOfRows: ObservableArray = new ObservableArray();

  public listShopGroupSubscription: any;
  public listShopGroupObservableArray: ObservableArray = new ObservableArray();
  public listShopGroupCollectionView: CollectionView = new CollectionView(this.listShopGroupObservableArray);
  public listShopPageIndex: number = 15;
  @ViewChild('listShopGroupFlexGrid') listShopGroupFlexGrid: WjFlexGrid;

  public saveShopGroupSubscription: any;
  public deleteShopGroupSubscription: any;

  public mstShopGroup: MstShopGroupModel = {
    Id: 0,
    ShopGroupCode: "",
    ShopGroup: ""
  };

  public shopGroupModalTitle: String = "";
  public shopGroupModalRef: BsModalRef;

  public shopGroupDeleteModalRef: BsModalRef;

  public getUserFormsSubscription: any;
  public isLoadingSpinnerHidden: boolean = false;
  public isContentHidden: boolean = true;
  
  public isAddButtonHide: boolean = true;
  public isEditButtonHide: boolean = true;
  public isDeleteButtonHide: boolean = true;
  
  public isShowEditColumn: boolean = false;
  public isShowDeleteColumn: boolean = false;

  public isProgressBarHidden = false;

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
    this.listShopPageIndex = selectedValue;

    this.listShopGroupCollectionView.pageSize = this.listShopPageIndex;
    this.listShopGroupCollectionView.refresh();
    this.listShopGroupCollectionView.refresh();
  }

  // List shop group
  public listShopGroup(): void {
    this.listShopGroupObservableArray = new ObservableArray();
    this.listShopGroupCollectionView = new CollectionView(this.listShopGroupObservableArray);
    this.listShopGroupCollectionView.pageSize = 15;
    this.listShopGroupCollectionView.trackChanges = true;
    this.listShopGroupCollectionView.refresh();
    this.listShopGroupFlexGrid.refresh();
    
    this.isProgressBarHidden = false;

    this.mstShopGroupService.listShopGroup();
    this.listShopGroupSubscription = this.mstShopGroupService.listShopGroupObservable.subscribe(
      data => {
        if (data.length > 0) {
          this.listShopGroupObservableArray = data;
          this.listShopGroupCollectionView = new CollectionView(this.listShopGroupObservableArray);
          this.listShopGroupCollectionView.pageSize = this.listShopPageIndex;
          this.listShopGroupCollectionView.trackChanges = true;
          this.listShopGroupCollectionView.refresh();
          this.listShopGroupFlexGrid.refresh();
        }

        this.isProgressBarHidden = true;
        if (this.listShopGroupSubscription != null) this.listShopGroupSubscription.unsubscribe();
      }
    );
  }

  // Open shop group modal
  public btnOpenShopGroupModalClick(shopGroupModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.shopGroupModalRef = this.modalService.show(shopGroupModalTemplate, { class: "" });

    let inpShopGroupCode: Element = document.getElementById("inpShopGroupCode");
    let inpShopGroupName: Element = document.getElementById("inpShopGroupName");
    (<HTMLInputElement>inpShopGroupCode).disabled = false;
    (<HTMLInputElement>inpShopGroupName).disabled = false;

    let btnSaveShopGroup: Element = document.getElementById("btnSaveShopGroup");
    let btnCloseShopGroupModal: Element = document.getElementById("btnCloseShopGroupModal");
    (<HTMLButtonElement>btnSaveShopGroup).disabled = false;
    (<HTMLButtonElement>btnCloseShopGroupModal).disabled = false;

    if (isNew) {
      this.shopGroupModalTitle = "New Group";

      this.mstShopGroup.Id = 0;
      this.mstShopGroup.ShopGroupCode = "";
      this.mstShopGroup.ShopGroup = "";
    } else {
      this.shopGroupModalTitle = "Edit Group";

      let currentShopGroup = this.listShopGroupCollectionView.currentItem;
      this.mstShopGroup.Id = currentShopGroup.Id;
      this.mstShopGroup.ShopGroupCode = currentShopGroup.ShopGroupCode;
      this.mstShopGroup.ShopGroup = currentShopGroup.ShopGroup;
    }
  }

  // Save shop group
  public btnSaveShopGroupClick(): void {
    let inpShopGroupCode: Element = document.getElementById("inpShopGroupCode");
    let inpShopGroupName: Element = document.getElementById("inpShopGroupName");
    (<HTMLInputElement>inpShopGroupCode).disabled = true;
    (<HTMLInputElement>inpShopGroupName).disabled = true;

    let btnSaveShopGroup: Element = document.getElementById("btnSaveShopGroup");
    let btnCloseShopGroupModal: Element = document.getElementById("btnCloseShopGroupModal");
    (<HTMLButtonElement>btnSaveShopGroup).disabled = true;
    (<HTMLButtonElement>btnCloseShopGroupModal).disabled = true;

    if (this.mstShopGroup.ShopGroupCode !== "" && this.mstShopGroup.ShopGroup !== "") {
      this.mstShopGroupService.saveShopGroup(this.mstShopGroup);
      this.saveShopGroupSubscription = this.mstShopGroupService.saveShopGroupObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.toastr.success("Shop group was successfully saved.", "Success");

            this.shopGroupModalRef.hide();
            this.listShopGroup();
          } else if (data[0] == "failed") {
            this.toastr.error(data[1], "Error");

            (<HTMLInputElement>inpShopGroupCode).disabled = false;
            (<HTMLInputElement>inpShopGroupName).disabled = false;

            (<HTMLButtonElement>btnSaveShopGroup).disabled = false;
            (<HTMLButtonElement>btnCloseShopGroupModal).disabled = false;
          }

          if (this.saveShopGroupSubscription != null) this.saveShopGroupSubscription.unsubscribe();
        }
      );
    } else {
      this.toastr.error("Please don't leave empty fields.", "Error");

      (<HTMLInputElement>inpShopGroupCode).disabled = false;
      (<HTMLInputElement>inpShopGroupName).disabled = false;

      (<HTMLButtonElement>btnSaveShopGroup).disabled = false;
      (<HTMLButtonElement>btnCloseShopGroupModal).disabled = false;
    }
  }

  // Delete shop group
  public btnDeleteShopGroupClick(shopGroupDeleteModalTemplate: TemplateRef<any>): void {
    this.shopGroupDeleteModalRef = this.modalService.show(shopGroupDeleteModalTemplate, { class: "modal-sm" });

    let btnConfirmDeleteShopGroup: Element = document.getElementById("btnConfirmDeleteShopGroup");
    let btnCloseConfirmDeleteShopGroupModal: Element = document.getElementById("btnCloseConfirmDeleteShopGroupModal");
    (<HTMLButtonElement>btnConfirmDeleteShopGroup).disabled = false;
    (<HTMLButtonElement>btnCloseConfirmDeleteShopGroupModal).disabled = false;

    let currentShopGroup = this.listShopGroupCollectionView.currentItem;
    this.mstShopGroup.Id = currentShopGroup.Id;
  }

  // Confirm delete shop group
  public btnConfirmDeleteShopGroupClick(): void {
    let btnConfirmDeleteShopGroup: Element = document.getElementById("btnConfirmDeleteShopGroup");
    let btnCloseConfirmDeleteShopGroupModal: Element = document.getElementById("btnCloseConfirmDeleteShopGroupModal");
    (<HTMLButtonElement>btnConfirmDeleteShopGroup).disabled = true;
    (<HTMLButtonElement>btnCloseConfirmDeleteShopGroupModal).disabled = true;

    this.mstShopGroupService.deleteShopGroup(this.mstShopGroup.Id);
    this.deleteShopGroupSubscription = this.mstShopGroupService.deleteShopGroupObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("Shop group was successfully deleted.", "Success");

          this.shopGroupDeleteModalRef.hide();
          this.listShopGroup();
        } else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");

          (<HTMLButtonElement>btnConfirmDeleteShopGroup).disabled = false;
          (<HTMLButtonElement>btnCloseConfirmDeleteShopGroupModal).disabled = false;
        }

        if (this.deleteShopGroupSubscription != null) this.deleteShopGroupSubscription.unsubscribe();
      }
    );
  }

  // On page load
  ngOnInit() {
    this.createCboShowNumberOfRows();
    setTimeout(() => {
      this.softwareUserFormService.getCurrentForm("ShopGroupList");
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

            if (data.CanDelete) {
              this.isDeleteButtonHide = false;
              this.isShowDeleteColumn = true;
            }

            this.listShopGroup();
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
    if (this.listShopGroupSubscription != null) this.listShopGroupSubscription.unsubscribe();
    if (this.saveShopGroupSubscription != null) this.saveShopGroupSubscription.unsubscribe();
    if (this.deleteShopGroupSubscription != null) this.deleteShopGroupSubscription.unsubscribe();
    if (this.getUserFormsSubscription != null) this.getUserFormsSubscription.unsubscribe();
  }
}
