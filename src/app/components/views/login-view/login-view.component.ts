import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomLoginService } from '@app/services/custom';
import { CustomUserService } from '@app/services/custom';
import { first } from 'rxjs/operators';
import { User } from '@app/models';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.less']
})
export class LoginViewComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: CustomLoginService,
    private userService: CustomUserService,
    private _snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in if memory uservalue is filled that means it is already logged in.
    if (localStorage.getItem('access-token')) {
      this.userService.getMe().pipe(first()).subscribe({
        next: (response) => {
          this.loading = false;
          this.user = response;
          if (this.user.role == "teacher"){
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['student-home'])
          }            
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

  user: User;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.loginService
      .login({ email: this.f.email.value, password: this.f.password.value })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.loading = false;

          this.userService.getMe().pipe(first()).subscribe({
            next: (response) => {
              this.loading = false;
              this.user = response;
              if (this.user.role == "teacher"){
                this.router.navigate([this.returnUrl]);
              }
              else{
                this.router.navigate(['student-home'])
              }            
            },
            error: (error) => {
              this.error = error;
              this.loading = false;
              this._snackBar.open(this.error, 'Close', {
                duration: 3000
              });
            },
          })
          
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
