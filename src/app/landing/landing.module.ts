// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing 
import { LandingRoutingModule } from './landing-routing.module';

// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';

// Font Awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
