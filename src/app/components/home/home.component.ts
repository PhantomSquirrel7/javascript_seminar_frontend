import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/models';
import { CustomUserService } from '@app/services/custom';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
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
              this._snackBar.open('Welcome to home page!', 'Close', {
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