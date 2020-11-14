import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/models';
import { CustomUserService, CustomLoginService } from '@app/services/custom';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-home-view',
  templateUrl: './student-home-view.component.html',
  styleUrls: ['./student-home-view.component.less']
})
export class StudentHomeViewComponent {
  loading = false;
  error = '';
  user: User;

  constructor(private userService: CustomUserService, private _snackBar : MatSnackBar, private loginService : CustomLoginService) { }

  ngOnInit() {
      this.loading = true;
      this.userService.getMe().pipe(first()).subscribe({
          next: (response) => {
            this.loading = false;
            this.user = response;
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            this._snackBar.open(this.error, 'Close', {
              duration: 3000
            });
          },
        })
  }
}
