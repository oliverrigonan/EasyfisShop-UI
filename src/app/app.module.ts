// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Routing and Components
import { AppRoutingModule } from './app-routing.module';
import { AppRouterActivate } from './app.router.activate';
import { AppComponent } from './app.component';

// Animation and Stuffs
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';

// App Settings
import { AppSettings } from '../app/app.settings';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AppSettings,
    AppRouterActivate
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
