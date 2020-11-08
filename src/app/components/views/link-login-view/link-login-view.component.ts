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
  ) { }


  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmE4MTY2ZTk4YmViYTAwMTZkMGUwMzMiLCJpYXQiOjE2MDQ4NTY2NjAsImV4cCI6MTYwNDg2Mzg2MH0.W-OeVJIUPa9D4sG9zk4xBrI9nFsmV6lYmvPaAD9LClc"
  refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmE4MTY2ZTk4YmViYTAwMTZkMGUwMzMiLCJpYXQiOjE2MDQ4NTY2NjAsImV4cCI6MTYxMDA0MDY2MH0.fenDWFV7MbA1pIAI-f9QY8jRffSunOfWywstm5BVhX8"

  ngOnInit(): void {
    this.loginService.loginWithToken(this.token, this.refreshToken);
  }

}
