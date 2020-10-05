import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utils';
import {
  CreateClassViewComponent,
  ProfileViewComponent,
  CreateStudentViewComponent,
  FindPartnerClassViewComponent,
  LandingViewComponent,
  LandingViewOfferingComponent,
  LandingViewTeamComponent,
  LoginViewComponent,
  MyClassViewComponent,
  RegisterViewComponent,
  MyMeetingRequestsViewComponent,
  SettingsViewComponent,
  DashboardViewComponent,
  AboutViewComponent,
  PlanMeetingViewComponent,
  ForgotPasswordViewComponent
} from './components';

const routes: Routes = [
  { path: '', component: LandingViewComponent },
  { path: 'offering', component: LandingViewOfferingComponent },
  { path: 'team', component: LandingViewTeamComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'forgot-password', component: ForgotPasswordViewComponent },
  { path: 'about', component: AboutViewComponent },
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-class',
    component: MyClassViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-class',
    component: CreateClassViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'find-partner-class',
    component: FindPartnerClassViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-student',
    component: CreateStudentViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plan-meeting',
    component: PlanMeetingViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-meeting-requests',
    component: MyMeetingRequestsViewComponent,
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
