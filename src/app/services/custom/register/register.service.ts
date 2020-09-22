import { Injectable } from '@angular/core';
import { AuthService } from '../../swagger-api/api';
import { User,Body, Token, AuthTokens } from '@app/models';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomLoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomRegisterService {
  
  constructor(private authApi: AuthService, private loginService : CustomLoginService) { }

  register (user : Body){
    return this.authApi.authRegisterPost(user)
    .pipe(map(response => {
      this.loginService.userValue = response.user;
      this.loginService.tokenValue = response.tokens;
      this.loginService.startRefreshTokenTimer();
      return response.user;
  }));
  }

}
