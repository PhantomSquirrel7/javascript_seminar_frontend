import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './utils';
import {
  LoginViewComponent,
  AboutViewComponent,
  CreateClassViewComponent,
  CreateStudentViewComponent,
  DashboardViewComponent,
  MyMeetingRequestsViewComponent,
  ResetPasswordViewComponent,
  RegisterViewComponent,
  FindPartnerClassViewComponent,
  FindPartnerClassContentComponent,
  ForgotPasswordViewComponent,
  LandingViewComponent,
  LandingViewOfferingComponent,
  LandingViewTeamComponent,
  ProfileViewComponent,
  SettingsViewComponent,
  MyClassViewComponent,
  PlanMeetingViewComponent,
  DashboardContentComponent,
  PlanMeetingContentComponent,
  HeaderComponent,
  FooterComponent,
  LandingHeaderComponent,
  NavigationComponent,
  ProfileViewContentComponent,
  LandingHomeContentComponent,
  LandingOfferingContentComponent,
  LandingTeamContentComponent,
  MyConnectionRequestsViewComponent
} from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { CustomLoginService } from '@app/services/custom';
import { UserService } from './services/swagger-api/api';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
  ],
  declarations: [
    AppComponent,
    LandingViewComponent,
    LoginViewComponent,
    RegisterViewComponent,
    ForgotPasswordViewComponent,
    FooterComponent,
    HeaderComponent,
    LandingHeaderComponent,
    NavigationComponent,
    PlanMeetingViewComponent,
    PlanMeetingContentComponent,
    FindPartnerClassViewComponent,
    MyClassViewComponent,
    SettingsViewComponent,
    ProfileViewComponent,
    AboutViewComponent,
    CreateClassViewComponent,
    CreateStudentViewComponent,
    DashboardViewComponent,
    MyMeetingRequestsViewComponent,
    ResetPasswordViewComponent,
    DashboardContentComponent,
    ProfileViewContentComponent,
    LandingHomeContentComponent ,
    LandingViewOfferingComponent ,
    LandingViewTeamComponent,
    LandingTeamContentComponent,
    LandingOfferingContentComponent,
    MyConnectionRequestsViewComponent,
    FindPartnerClassContentComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [CustomLoginService, UserService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
