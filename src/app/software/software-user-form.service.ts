import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../app.settings';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareUserFormService {
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  // Request options
  public options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };
  public defaultAPIURLHost: string = this.appSettings.defaultAPIURLHost;

  public getCurrentUserFormSource = new Subject<any>();
  public getCurrentUserFormsObservable = this.getCurrentUserFormSource.asObservable();

  public getCurrentForm(formName: string): void {
    let userForm = {
      Id: 0,
      UserId: 0,
      FormId: 0,
      CanAdd: false,
      CanEdit: false,
      CanDelete: false,
      CanLock: false,
      CanUnlock: false,
      CanCancel: false,
      CanPrint: false
    }

    this.getCurrentUserFormSource.next(userForm);
    this.httpClient.get(this.defaultAPIURLHost + "/api/userForm/currentForm/" + formName, this.options).subscribe(
      response => {
        var result = response;
        if (result != null) {
          userForm = {
            Id: result["Id"],
            UserId: result["UserId"],
            FormId: result["FormId"],
            CanAdd: result["CanAdd"],
            CanEdit: result["CanEdit"],
            CanDelete: result["CanDelete"],
            CanLock: result["CanLock"],
            CanUnlock: result["CanUnlock"],
            CanCancel: result["CanCancel"],
            CanPrint: result["CanPrint"]
          }

          this.getCurrentUserFormSource.next(userForm);
        } else {
          this.getCurrentUserFormSource.next(null)
        }
      }
    );
  }
}
