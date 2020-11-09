
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

}