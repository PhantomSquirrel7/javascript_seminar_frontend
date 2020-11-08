import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomLoginService } from '@app/services/custom';
import { CustomUserService } from '@app/services/custom';
import { AuthService } from '@app/services/swagger-api/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-link-login-view',
  templateUrl: './link-login-view.component.html',
  styleUrls: ['./link-login-view.component.less']
})
export class LinkLoginViewComponent {

  constructor(
    private loginService: CustomLoginService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: CustomUserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: '';
  success: string;


  token = "";
  refreshToken = "";
  refreshPasswordToken = "";



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      password:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*'), // one number and one character
        Validators.maxLength(25),
        Validators.minLength(8),
      ]))
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.refreshToken = params['refresh'];
      this.refreshPasswordToken = params['refreshPasswordToken']

      console.log(this.token);
      console.log(this.refreshToken);
      console.log(this.refreshPasswordToken);
      // this.loginService.loginWithToken(this.token, this.refreshToken);
    });
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

    password: this.f.password.value,

    this.authService.authResetPasswordPost({"password": this.f.password.value}, this.refreshPasswordToken).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        this.loginService.logout();
        this.router.navigate(['/login']);
      } 
    );
  } 

  skip(){
      this.router.navigate(['/login']);
  }

}
