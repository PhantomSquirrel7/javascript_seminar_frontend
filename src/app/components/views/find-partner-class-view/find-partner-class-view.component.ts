import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/models';
import { CustomUserService, CustomLoginService } from '@app/services/custom';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-find-partner-class-view',
  templateUrl: './find-partner-class-view.component.html',
  styleUrls: ['./find-partner-class-view.component.less']
})
export class FindPartnerClassViewComponent {

  loading = false;
  error = '';
  user: User;

  constructor(private userService: CustomUserService, private _snackBar: MatSnackBar, private loginService: CustomLoginService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getMe().pipe(first()).subscribe({
      next: (response) => {
        this.loading = false;
        this.user = response;
        this._snackBar.open('Welcome to find-partner-class page!', 'Close', {
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
  }
}
