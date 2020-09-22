import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CustomLoginService } from '@app/services/custom';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
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
    private _snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in if memory uservalue is filled that means it is already logged in.
    if (localStorage.getItem('access-token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          this.router.navigate([this.returnUrl]);
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
