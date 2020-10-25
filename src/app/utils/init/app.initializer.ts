import { CustomLoginService } from '@app/services/custom';
import { UserService } from '@app/services/swagger-api/api';
import { forkJoin } from 'rxjs';

export function appInitializer(loginService: CustomLoginService, userApi : UserService) {
  return () => {
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate, mimics the login event. Get access token and user information into memory again.
      if (localStorage.getItem('refresh-token')){
        loginService.refreshToken({refreshToken: localStorage.getItem('refresh-token')}).toPromise().then( () => {
          userApi.meGet().toPromise().then((response) => {
            loginService.userValue = response;
            resolve();
          })
        });
      }else{
        resolve();
      }
        });
  }
}