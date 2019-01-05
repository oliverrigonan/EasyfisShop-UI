import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MstShopOrderStatusComponent } from './mst-shop-order-status/mst-shop-order-status.component';
import { MstShopGroupComponent } from './mst-shop-group/mst-shop-group.component';
import { TrnShopOrderListComponent } from './trn-shop-order-list/trn-shop-order-list.component';
import { TrnShopOrderDetailComponent } from './trn-shop-order-detail/trn-shop-order-detail.component';
import { RepOrderSummaryReportComponent } from './rep-order-summary-report/rep-order-summary-report.component';
import { SysSoftwareLayoutComponent } from './sys-software-layout/sys-software-layout.component';
import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';
import { ErrForbiddenComponent } from './err-forbidden/err-forbidden.component';

import { SoftwareRouterActivate } from './software.router.activate';

const routes: Routes = [
  {
    path: '', component: SysSoftwareLayoutComponent, canActivate: [SoftwareRouterActivate],
    children: [
      { path: '', component: SysDashboardComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'sys-main-menu', component: SysDashboardComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'mst-shop-order-status', component: MstShopOrderStatusComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'mst-shop-group', component: MstShopGroupComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'trn-shop-order-list', component: TrnShopOrderListComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'trn-shop-order-detail/:id', component: TrnShopOrderDetailComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'rep-order-summary-report', component: RepOrderSummaryReportComponent, canActivate: [SoftwareRouterActivate] },
      { path: 'err-forbidden', component: ErrForbiddenComponent, canActivate: [SoftwareRouterActivate] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
