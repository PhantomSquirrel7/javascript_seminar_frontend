import { Component, OnInit } from '@angular/core';
import { StudentsService } from '@app/services/swagger-api/api';
import { CustomLoginService, CustomUserService } from '@app/services/custom';
import { UserService } from '@app/services/swagger-api/api';
import { flatMap, map, catchError, first } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User, Body14 } from '@app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-student-meetings-content',
  templateUrl: './student-meetings-content.component.html',
  styleUrls: ['./student-meetings-content.component.less'],
})
export class StudentMeetingsContentComponent implements OnInit {
  constructor(
    private userService: CustomUserService,
    private _snackBar: MatSnackBar,
    private loginService: CustomLoginService,
    private user2Service: UserService
  ) {}

  loading = false;
  error: string;
  meetings = null;
  selectedMeetingId = null;

  ngOnInit() {
    this.loading = true;
    this.user2Service
      .meMeetingsGet()
      .toPromise()
      .then((response) => {
        this.meetings = response;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error;
        this._snackBar.open(this.error, 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.meetings = null;
      });
  }


  getMeetingsDetail(): void{
    
  }

}
