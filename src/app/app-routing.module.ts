import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utils';
import {
  CreateClassViewComponent,
  ProfileViewComponent,
  CreateStudentViewComponent,
  FindPartnerClassViewComponent,
  LandingViewComponent,
  LoginViewComponent,
  MyClassViewComponent,
  RegisterViewComponent,
  MyMeetingRequestsViewComponent,
  SettingsViewComponent,
  DashboardViewComponent,
  AboutViewComponent,
  PlanMeetingViewComponent,
  ForgotPasswordViewComponent,
  GamesStudentViewComponent,
  GamesTeacherViewComponent,
  AliasGameConfigComponent,
  QuizGameConfigComponent,
  DrawItGameConfigComponent,
  OverviewGamesConfigComponent
} from './components';

const routes: Routes = [
  { path: '', component: LandingViewComponent },
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
  {
    path: 'games-student',
    component: GamesStudentViewComponent,
    canActivate: [AuthGuard],
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
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
