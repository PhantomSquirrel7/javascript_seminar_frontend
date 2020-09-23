import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/models';
import { CustomUserService, CustomLoginService } from '@app/services/custom';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.less']
})
export class LandingHeaderComponent {
  user: User;
  error = '';
  loggedin = false;

  constructor(private userService: CustomUserService, private _snackBar : MatSnackBar, private loginService : CustomLoginService) { }

  ngOnInit(): void {
    this.loggedin = false;
    this.userService.getMe().pipe(first()).subscribe({
      next: (response) => {
        this.loggedin = true;
        this.user = response;
      },
      error: (error) => {
        this.error = error;
        this.loggedin = false;
      },
    })
  }
}