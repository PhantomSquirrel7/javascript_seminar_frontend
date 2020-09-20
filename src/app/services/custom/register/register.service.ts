import { Injectable } from '@angular/core';
import { AuthService } from '../../swagger-api/api';
import { User,Body, Token, AuthTokens } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class CustomRegisterService {
  constructor(private authApi: AuthService) { }

  register (user : Body){
    return this.authApi.authRegisterPost(user)
  }

}
