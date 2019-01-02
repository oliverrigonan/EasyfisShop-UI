import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor() { }

  public username: String = "";
  public isShowLoginButton: Boolean = true;
  public isShowUsername: Boolean = false;

  public signOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('username');

    this.username = "";

    location.reload();
  }

  ngOnInit() {
    if (localStorage.getItem("access_token") != null) {
      this.username = localStorage.getItem("username");
      this.isShowLoginButton = false;
      this.isShowUsername = true;
    } else {
      this.username = "";
      this.isShowUsername = false;
      this.isShowLoginButton = true;
    }
  }
}
