import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models';
import { CustomUserService } from '@app/services/custom';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.less']
})
export class DashboardViewComponent implements OnInit {
  loading = false;
  error = '';
  user: User;

  constructor(private userService: CustomUserService, private _snackBar : MatSnackBar) { }

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
