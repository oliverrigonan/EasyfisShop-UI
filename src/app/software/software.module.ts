import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoftwareRoutingModule } from './software-routing.module';

import { MstShopOrderStatusComponent } from './mst-shop-order-status/mst-shop-order-status.component';
import { MstShopGroupComponent } from './mst-shop-group/mst-shop-group.component';
import { TrnShopOrderListComponent } from './trn-shop-order-list/trn-shop-order-list.component';
import { TrnShopOrderDetailComponent } from './trn-shop-order-detail/trn-shop-order-detail.component';
import { RepOrderSummaryReportComponent } from './rep-order-summary-report/rep-order-summary-report.component';
import { SysSoftwareLayoutComponent } from './sys-software-layout/sys-software-layout.component';
import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    MstShopOrderStatusComponent,
    MstShopGroupComponent,
    RepOrderSummaryReportComponent,
    TrnShopOrderDetailComponent,
    TrnShopOrderListComponent,
    SysSoftwareLayoutComponent,
    SysDashboardComponent
  ],
  imports: [
    CommonModule,
    SoftwareRoutingModule,
    AngularFontAwesomeModule,
    MatSidenavModule
  ]
})
export class SoftwareModule { }
