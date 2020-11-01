
import { Component, OnInit } from '@angular/core';
import { first, flatMap, map } from 'rxjs/operators';
import { User } from '@app/models';
import { CustomUserService, CustomLoginService } from '@app/services/custom';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from '@app/services/swagger-api/api';

@Component({
  selector: 'app-student-meetings-view',
  templateUrl: './student-meetings-view.component.html',
  styleUrls: ['./student-meetings-view.component.less']
})
export class StudentMeetingsViewComponent {

  constructor(
    private userService: CustomUserService, 
    private _snackBar : MatSnackBar, 
    private loginService : CustomLoginService,
    private user2Service: UserService,
    ) { }

  user_student: any = {};
  loading = false;
  user: User;
  error: string;
  meetings = [];
  noMeetings = true;



  ngOnInit() {
      this.loading = true;
      this.userService.getMe().pipe(first()).subscribe({
          next: (response) => {
            this.loading = false;
            this.user = response;
            this._snackBar.open('Welcome to your Meetings!', 'Close', {
              duration: 3000
            });
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            this._snackBar.open(this.error, 'Close', {
              duration: 3000
            });
          },
        })
  
      this.userService.getMe().pipe(
        flatMap( (user) =>
          this.user2Service.meMeetingsGet().pipe(
            map(
              meetings => {
                this.user_student = user;
                console.log(user);
                this.meetings = meetings;
                console.log(meetings);
                if (this.meetings.length > 0){
                  this.noMeetings = false;
                }
                return user;
              } 
            )
          )
        )
      ).subscribe({
        next: (response) => {
          this.loading = false;
          this.user_student = response;
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
          duration: 3000
          });
          this.loading = false;
        },
      });
      }
}