import { Injectable } from '@angular/core';
import { AppSettings } from '../../../app/app.settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIHostURL: string = this.appSettings.defaultAPIURLHost;

  public loginSource = new Subject<[Boolean, String]>();
  public loginObservable = this.loginSource.asObservable();

  public login(username: string, password: string): void {
    let url = this.defaultAPIHostURL + '/token';
    let body = "username=" + username + "&password=" + password + "&grant_type=password";
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

    this.httpClient.post(url, body, options).subscribe(
      response => {
        localStorage.setItem('access_token', response["access_token"]);
        localStorage.setItem('expires_in', response["expires_in"]);
        localStorage.setItem('token_type', response["token_type"]);
        localStorage.setItem('username', response["userName"]);

        this.loginSource.next([true, "Login Successful."]);
      },
      error => {
        this.loginSource.next([false, error["error"].error_description]);
      }
    )
  }
}
