import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './utils';
import { HomeComponent,LoginComponent,RegisterComponent,ForgotPasswordComponent } from './components';;
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, LandingComponent, HomeComponent, LoginComponent,RegisterComponent,ForgotPasswordComponent],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [CustomAuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
