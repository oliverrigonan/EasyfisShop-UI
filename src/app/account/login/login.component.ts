import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginModel } from './login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public loginSubscription: any;
  public loginModel: LoginModel = {
    UserName: "",
    Password: ""
  };

  public login(): void {
    let btnLogin: Element = document.getElementById("btnLogin");
    btnLogin.setAttribute("disabled", "disabled");
    btnLogin.setAttribute("value", "Signing in...");

    let inpUsername: Element = document.getElementById("inpUsername");
    inpUsername.setAttribute("disabled", "disabled");

    let inpPassword: Element = document.getElementById("inpPassword");
    inpPassword.setAttribute("disabled", "disabled");

    this.loginService.login(this.loginModel.UserName, this.loginModel.Password);
    this.loginSubscription = this.loginService.loginObservable.subscribe(
      data => {
        if (data[0]) {
          this.toastr.success(data[1].toString(), 'Success');

          setTimeout(() => {
            this.router.navigate(['/software']);
            if (this.loginSubscription != null) this.loginSubscription.unsubscribe();
          }, 500);
        } else {
          this.toastr.error(data[1].toString(), 'Error');
          
          btnLogin.removeAttribute("disabled");
          btnLogin.setAttribute("value", "Sign in");

          inpUsername.removeAttribute("disabled");
          inpPassword.removeAttribute("disabled");

          if (this.loginSubscription != null) this.loginSubscription.unsubscribe();
        }
      }
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.loginSubscription != null) this.loginSubscription.unsubscribe();
  }
}
