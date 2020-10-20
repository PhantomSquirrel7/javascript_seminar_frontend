import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomLoginService, CustomUserService } from '@app/services/custom';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private userService: CustomUserService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('access-token');
        if (token) {
            return this.userService.getMe().pipe(map(
              user => {
                if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                  // role not authorised so redirect to home page
                  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                  return false;
                }
                else{
                  return true;
                }
              }),
              catchError((err) => {
                console.error(err);
                return of(false);
              })
            );

        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}