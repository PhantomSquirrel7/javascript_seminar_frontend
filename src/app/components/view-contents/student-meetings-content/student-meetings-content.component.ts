import { Component, OnInit } from '@angular/core';
import { StudentsService } from '@app/services/swagger-api/api';
import { CustomUserService } from '@app/services/custom';
import { UserService } from '@app/services/swagger-api/api';
import { flatMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User, Body14 } from '@app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-student-meetings-content',
  templateUrl: './student-meetings-content.component.html',
  styleUrls: ['./student-meetings-content.component.less']
})
export class StudentMeetingsContentComponent implements OnInit {

  constructor(
    private studentService: StudentsService,
    private userService: CustomUserService,
    private user2Service: UserService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) { }

  user_student: any = {};
	loading = true; // true if waiting for results
  error = '';
  noMeetings = true;
  meetings = [];


	ngOnInit() {
    // this.userService.getMe().pipe(
    //   flatMap( (user) =>
    //     this.user2Service.meMeetingsGet().pipe(
    //       map(
    //         meetings => {
    //           this.user_student = user;
    //           console.log(user);
    //           this.meetings = meetings;
    //           console.log(meetings);
    //           if (this.meetings.length > 0){
    //             this.noMeetings = false;
    //           }
    //           return user;
    //         } 
    //       )
    //     )
    //   )
    // ).subscribe({
    //   next: (response) => {
    //     this.loading = false;
    //     this.user_student = response;
    //   },
    //   error: (error) => {
    //     this.error = error;
    //     this._snackBar.open(this.error, 'Close', {
    //     duration: 3000
    //     });
    //     this.loading = false;
    //   },
    // });
  }
}
