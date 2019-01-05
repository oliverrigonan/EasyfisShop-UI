import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    this.routerEvents();
  }

  public routerEvents(): void {
    this.router.events.subscribe((val) => {
      let toolBarImage: Element = document.getElementById("toolBarImage");
      if (this.router.url == "/software" || this.router.url == "/software/sys-main-menu") {
        this.ToolbarTitle = "Main Menu";
        toolBarImage.setAttribute("src", "../../assets/img/icons/menu.png");
      } else if (this.router.url == "/software/mst-shop-order-status") {
        this.ToolbarTitle = "Status";
        toolBarImage.setAttribute("src", "../../assets/img/icons/shoporderstatus.png");
      } else if (this.router.url == "/software/mst-shop-group") {
        this.ToolbarTitle = "Group";
        toolBarImage.setAttribute("src", "../../assets/img/icons/shopgroup.png");
      } else if (this.router.url == "/software/trn-shop-order-list") {
        this.ToolbarTitle = "Order";
        toolBarImage.setAttribute("src", "../../assets/img/icons/shoporder.png");
      } else if (this.router.url == "/software/rep-order-summary-report") {
        this.ToolbarTitle = "Report";
        toolBarImage.setAttribute("src", "../../assets/img/icons/report.png");
      } else {
        // this.ToolbarTitle = "Easyfis Shop";
      }
    });
  }

  public username: String = "";
  public ToolbarTitle: String = "";
  @ViewChild('sidenav') sidenav: MatSidenav;

  public openSideBar(): void {
    this.sidenav.toggle();
  }

  public signOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('username');

    this.username = "";

    location.reload();
  }

  ngOnInit() {
    this.openSideBar();
    this.username = localStorage.getItem("username");
  }
}
