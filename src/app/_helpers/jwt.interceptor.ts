import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { CustomAuthenticationService } from '@app/_services/custom';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: CustomAuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const tokens = this.authenticationService.tokenValue;
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && tokens.access;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${tokens.access.token}` }
            });
        }

        return next.handle(request);
    }
}