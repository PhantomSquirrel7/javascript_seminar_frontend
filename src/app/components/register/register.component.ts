import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', Validators.required],
      password: ['', Validators.required],
      schoolName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required]
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
