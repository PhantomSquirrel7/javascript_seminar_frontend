import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomLoginService } from '@app/services/custom';
import { CustomUserService } from '@app/services/custom';

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
  ) { }


  token = "";
  refreshToken = "";
  refreshPasswordToken = "";



  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.refreshToken = params['refresh'];
      this.refreshPasswordToken = params['refreshPasswordToken']

      console.log(this.token);
      console.log(this.refreshToken);
      console.log(this.refreshPasswordToken);
      this.loginService.loginWithToken(this.token, this.refreshToken);
    });
  }

}
