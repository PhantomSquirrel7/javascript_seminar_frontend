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
  StudentMeetingsViewComponent,
  ClassInformationViewComponent,
  GamesStudentViewComponent,
  GamesTeacherViewComponent,
  AliasGameConfigComponent,
  QuizGameConfigComponent,
  DrawItGameConfigComponent,
  OverviewGamesConfigComponent,
  StudentMeetingsContentComponent
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
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'settings',
    component: SettingsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'class-information',
    component: ClassInformationViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'create-class',
    component: CreateClassViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'create-student',
    component: CreateStudentViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'find-partner-class',
    component: FindPartnerClassViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'find-partner-class/results',
    component: FindPartnerClassViewResultsComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'create-student',
    component: CreateStudentViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'plan-meeting',
    component: PlanMeetingViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'my-meeting-requests',
    component: MyMeetingRequestsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'my-connection-requests',
    component: MyConnectionRequestsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'student-home',
    component: StudentHomeViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student] }
  },
  {
    path: 'student-profile',
    component: StudentProfileViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student] }
  },
  {
    path: 'student-assignments',
    component: StudentAssignmentsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student] }
  },
  {
    path: 'student-meetings',
    component: StudentMeetingsViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student] }
  },
  {
    path: 'student-games',
    component: GamesStudentViewComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student] }
  },
  {
    path: 'games-teacher',
    component: GamesTeacherViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'alias-config', component: AliasGameConfigComponent },
      { path: 'quiz-config', component: QuizGameConfigComponent },
      { path: 'draw-it-config', component: DrawItGameConfigComponent },
      { path: 'overview', component: OverviewGamesConfigComponent },
      { path: '**', redirectTo: 'overview' }
    ],
    data: { roles: [User.RoleEnum.Teacher] }
  },
  {
    path: 'student-meetings-content',
    component: StudentMeetingsContentComponent,
    canActivate: [AuthGuard],
    data: { roles: [User.RoleEnum.Student] }
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
