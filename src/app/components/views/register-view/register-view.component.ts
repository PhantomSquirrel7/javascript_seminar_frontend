import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomRegisterService, CustomLoginService } from '@app/services/custom';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.less']
})
export class RegisterViewComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: '';
  success: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registerService: CustomRegisterService,
    private loginService: CustomLoginService,
    private _snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (localStorage.getItem('access-token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('([A-Za-z]+(.)*[0-9]+)|([0-9]+(.)*[A-Za-z]+)'), // min. one number and one character
        Validators.maxLength(25),
        Validators.minLength(8),
      ]))
      ,
      firstName:  new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(1),
      ]))
      ,
      lastName:  new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(1),
      ]))
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

   // convenience getter for easy access to form fields
   get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.registerService
      .register({ email: this.f.email.value, password: this.f.password.value, firstName: this.f.firstName.value, lastName: this.f.lastName.value  })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this._snackBar.open('User successfully created!', 'Close', {
            duration: 3000
          });
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000
          });
        },
      });
  } 

}
