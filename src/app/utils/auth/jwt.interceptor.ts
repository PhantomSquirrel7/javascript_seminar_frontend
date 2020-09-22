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
        let accessToken = null;
        if(localStorage.getItem('access-token'))
            accessToken = localStorage.getItem('access-token');
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (accessToken && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` }
            });
        }

        return next.handle(request);
    }
}