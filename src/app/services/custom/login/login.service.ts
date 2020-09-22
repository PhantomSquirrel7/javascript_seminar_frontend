import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User,Body1, Body3, Token, AuthTokens } from '@app/models';
import { AuthService } from '../../swagger-api/api';

@Injectable({ providedIn: 'root' })
export class CustomLoginService {
    private userSubject: BehaviorSubject<User>;
    private tokenSubject: BehaviorSubject<AuthTokens>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private authApi: AuthService
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.tokenSubject = new BehaviorSubject<AuthTokens>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    public set userValue(data) {
        this.userSubject.next(data);
    }

    public get tokenValue(): AuthTokens {
        return this.tokenSubject.value;
    }

    public set tokenValue(data) {
        this.tokenSubject.next(data);
    }

    login(credentials: Body1) {
        return this.authApi.authLoginPost(credentials)
            .pipe(map(inlineResponse201 => {
                this.userSubject.next(inlineResponse201.user);
                this.tokenSubject.next(inlineResponse201.tokens);
                this.startRefreshTokenTimer();
                return inlineResponse201.user;
            }));
    }

    logout() {
        this.authApi.authLogoutPost({refreshToken: this.tokenValue.refresh.token}).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken(credentials: Body3) {
        
        return this.authApi.authRefreshTokensPost(credentials)
            .pipe(map((tokens) => {
                this.tokenSubject.next(tokens);
                this.startRefreshTokenTimer();
                return tokens;
            }));
    }

    // helper methods

    private refreshTokenTimeout;

    public startRefreshTokenTimer() {
        const jwtAccessToken: Token = this.tokenValue.access; 
        const refreshToken: Token = this.tokenValue.access;

        // set a timeout to refresh the token a minute before it expires
        const expires = jwtAccessToken.expires;
        const timeout = Math.abs(new Date(expires).getTime() - new Date().getTime() - (60*1000));
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken({refreshToken: refreshToken.token}).subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}