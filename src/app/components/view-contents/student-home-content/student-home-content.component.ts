import { Component, OnInit } from '@angular/core';
import { StudentsService } from '@app/services/swagger-api/api';
import { CustomUserService } from '@app/services/custom';
import { UserService } from '@app/services/swagger-api/api';
import { flatMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User, Body14, InlineResponse20012 } from '@app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-student-home-content',
  templateUrl: './student-home-content.component.html',
  styleUrls: ['./student-home-content.component.less']
})
export class StudentHomeContentComponent implements OnInit {

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
  noNotifications = true;
  notifications: any[] = [];


	ngOnInit() {
		// this.userService.getMe().subscribe({
		// 	next: (response) => {
		// 		this.loading = false;
    //     this.user_student = response;
		// 	},
		// 	error: (error) => {
		// 		this.error = error;
		// 		this._snackBar.open(this.error, 'Close', {
		// 		duration: 3000
		// 		});
		// 		this.loading = false;
		// 	},
    // });
    this.userService.getMe().pipe(
      flatMap( (user) =>
        this.user2Service.meNotificationsGet().pipe(
          map(
            notifications => {
              this.user_student = user;
              console.log(user);
              this.notifications = notifications;
              console.log(notifications);
              if (this.notifications.length > 0){
                this.noNotifications = false;
              }
              else { // TODO: remove else, just mockup
                this.notifications = [
                  {
                    "id": "",
                    "title": "Messege 1",
                    "text": "Messege 1 text",
                    "opened": false,
                    "type": "notification",
                    "cta": {
                      "text": "string",
                      "url": "string"
                    },
                    "user": {
                      "email": "test@mail.de",
                      "firstName": "Peter",
                      "lastName": "Tester",
                      "role": "teacher"
                    }
                  }
                ];
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
