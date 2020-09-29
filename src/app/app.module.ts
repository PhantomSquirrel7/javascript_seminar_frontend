﻿import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './utils';
import { HomeComponent,LoginComponent,RegisterComponent,ForgotPasswordComponent, LandingComponent, HeaderComponent, FooterComponent } from './components';;
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import { CustomLoginService } from '@app/services/custom';
import { UserService } from './services/swagger-api/api';;
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContentComponent } from './components/content/content.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  declarations: [AppComponent, LandingComponent, HomeComponent, LoginComponent,RegisterComponent,ForgotPasswordComponent, FooterComponent, 
    HeaderComponent, LandingHeaderComponent, NavigationComponent, ContentComponent],   
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [CustomLoginService, UserService]},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
