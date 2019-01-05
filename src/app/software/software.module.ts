// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareRouterActivate } from './software.router.activate';

// Components
import { MstShopOrderStatusComponent } from './mst-shop-order-status/mst-shop-order-status.component';
import { MstShopGroupComponent } from './mst-shop-group/mst-shop-group.component';
import { TrnShopOrderListComponent } from './trn-shop-order-list/trn-shop-order-list.component';
import { TrnShopOrderDetailComponent } from './trn-shop-order-detail/trn-shop-order-detail.component';
import { RepOrderSummaryReportComponent } from './rep-order-summary-report/rep-order-summary-report.component';
import { SysSoftwareLayoutComponent } from './sys-software-layout/sys-software-layout.component';
import { SysDashboardComponent } from './sys-dashboard/sys-dashboard.component';
import { ErrForbiddenComponent } from './err-forbidden/err-forbidden.component';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Font Awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Wijmo
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// ngx Bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    MstShopOrderStatusComponent,
    MstShopGroupComponent,
    RepOrderSummaryReportComponent,
    TrnShopOrderDetailComponent,
    TrnShopOrderListComponent,
    SysSoftwareLayoutComponent,
    SysDashboardComponent,
    ErrForbiddenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SoftwareRoutingModule,
    AngularFontAwesomeModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    WjGridFilterModule,
    WjGridModule,
    WjInputModule,
    ModalModule.forRoot()
  ],
  providers: [
    SoftwareRouterActivate
  ]
})
export class SoftwareModule { }
