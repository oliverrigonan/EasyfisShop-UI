import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sys-software-layout',
  templateUrl: './sys-software-layout.component.html',
  styleUrls: ['./sys-software-layout.component.css']
})
export class SysSoftwareLayoutComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    router.events.subscribe((val) => {
      let toolBarImage: Element = document.getElementById("toolBarImage");
      if (router.url == "/software" || router.url == "/software/sys-main-menu") {
        this.ToolbarTitle = "Main Menu";
        toolBarImage.setAttribute("src", "../../assets/img/icons/menu.png");
      } else if (router.url == "/software/mst-shop-order-status") {
        this.ToolbarTitle = "Status";
        toolBarImage.setAttribute("src", "../../assets/img/icons/shoporderstatus.png");
      } else if (router.url == "/software/mst-shop-group") {
        this.ToolbarTitle = "Group";
        toolBarImage.setAttribute("src", "../../assets/img/icons/shopgroup.png");
      } else if (router.url == "/software/trn-shop-order-list") {
        this.ToolbarTitle = "Order";
        toolBarImage.setAttribute("src", "../../assets/img/icons/shoporder.png");
      } else if (router.url == "/software/rep-order-summary-report") {
        this.ToolbarTitle = "Reports";
        toolBarImage.setAttribute("src", "../../assets/img/icons/report.png");
      } else {
        this.ToolbarTitle = "Easyfis Shop";
      }
    });
  }

  public ToolbarTitle: String = "";
  @ViewChild('sidenav') sidenav: MatSidenav;

  public openSideBar(): void {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.openSideBar();
  }

}
