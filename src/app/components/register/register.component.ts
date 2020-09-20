import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomRegisterService, CustomLoginService } from '@app/services/custom/';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
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
    
  ) {
    // redirect to home if already logged in
    if (this.loginService.tokenValue) {
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
        Validators.pattern('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'), // one number and one character
        Validators.maxLength(25),
        Validators.minLength(8),
      ])),
      schoolName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
      ]))
      ,
      firstName:  new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
      ]))
      ,
      lastName:  new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
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
      .register({ email: this.f.email.value, password: this.f.password.value, schoolName: this.f.schoolName.value, firstName: this.f.firstName.value, lastName: this.f.lastName.value  })
      .pipe(first())
      .subscribe({
        next: () => {
          this.success = 'User successfully created!';
          this.loading = false;
          setTimeout(()=>{
            this.success = null;
          },5000);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  } 

}
