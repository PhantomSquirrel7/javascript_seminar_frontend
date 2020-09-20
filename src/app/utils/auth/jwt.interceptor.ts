import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { CustomLoginService } from '@app/services/custom';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: CustomLoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const tokens = this.loginService.tokenValue;
        const user = this.loginService.userValue;
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