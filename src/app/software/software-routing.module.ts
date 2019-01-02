import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MstShopOrderStatusComponent } from './mst-shop-order-status/mst-shop-order-status.component';
import { MstShopGroupComponent } from './mst-shop-group/mst-shop-group.component';
import { TrnShopOrderListComponent } from './trn-shop-order-list/trn-shop-order-list.component';
import { TrnShopOrderDetailComponent } from './trn-shop-order-detail/trn-shop-order-detail.component';
import { RepOrderSummaryReportComponent } from './rep-order-summary-report/rep-order-summary-report.component';
import { SysSoftwareLayoutComponent } from './sys-software-layout/sys-software-layout.component';
import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';

const routes: Routes = [
  {
    path: '', component: SysSoftwareLayoutComponent, children: [
      { path: '', component: SysDashboardComponent },
      { path: 'sys-main-menu', component: SysDashboardComponent },
      { path: 'mst-shop-order-status', component: MstShopOrderStatusComponent },
      { path: 'mst-shop-group', component: MstShopGroupComponent },
      { path: 'trn-shop-order-list', component: TrnShopOrderListComponent },
      { path: 'trn-shop-order-list', component: TrnShopOrderDetailComponent },
      { path: 'rep-order-summary-report', component: RepOrderSummaryReportComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
