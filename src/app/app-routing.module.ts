import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utils';
import { User } from './models';
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
  ForgotPasswordViewComponent,
  MyConnectionRequestsViewComponent,
  FindPartnerClassViewResultsComponent,
  StudentHomeViewComponent,
  StudentProfileViewComponent,
  StudentAssignmentsViewComponent,
  StudentMeetingsViewComponent
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
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'settings',
    component: SettingsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'my-class',
    component: MyClassViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'create-class',
    component: CreateClassViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'find-partner-class',
    component: FindPartnerClassViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'find-partner-class/results',
    component: FindPartnerClassViewResultsComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'create-student',
    component: CreateStudentViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'plan-meeting',
    component: PlanMeetingViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'my-meeting-requests',
    component: MyMeetingRequestsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'my-connection-requests',
    component: MyConnectionRequestsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher]}
  },
  {
    path: 'student-home',
    component: StudentHomeViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student]}
  },
  {
    path: 'student-profile',
    component: StudentProfileViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student]}
  },
  {
    path: 'student-assignments',
    component: StudentAssignmentsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student]}
  },
  {
    path: 'student-meetings',
    component: StudentMeetingsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student]}
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
