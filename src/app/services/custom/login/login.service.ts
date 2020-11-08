import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, merge, concat } from 'rxjs';
import { map, first, mergeMap, flatMap } from 'rxjs/operators';
import { User,Body1, Body3, Token, AuthTokens } from '@app/models';
import { AuthService,UserService } from '../../swagger-api/api';
import { CustomUserService } from '@app/services/custom';

@Injectable({ providedIn: 'root' })
export class CustomLoginService {
    private userSubject: BehaviorSubject<User>;
    private tokenSubject: BehaviorSubject<AuthTokens>;
    public user: Observable<User>;
    private refreshTokenTimeout;

    constructor(
        private router: Router,
        private authApi: AuthService,
        private userApi: UserService,
        private userService: CustomUserService,
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

    loginWithToken(token: string, refreshToken: string){
        console.log("Store Token");
        let now = new Date();
        let myTokens: AuthTokens = {  // change 60 accordingly
            "access": {
                "token": token,
                "expires": new Date(now.getTime() + 60*60000)
            },
            "refresh": {
                "token": refreshToken,
                "expires": new Date(now.getTime() + 60*60000)
            }
        }

        let myRefreshToken: Body3 = {
            "refreshToken": refreshToken
        };
        this.tokenSubject.next(myTokens);
        this.storeRefreshAccessTokenOnLocalStorage(refreshToken, token);
        console.log("refresh now:")
        this.refreshToken(myRefreshToken).subscribe({
            next: (resp) => {
                console.log(resp);
            }
        });
        this.startRefreshTokenTimer();
        this.userService.getMe().pipe(first()).subscribe({
            next: (response) => {
              console.log("got me");
              this.userSubject.next(response);
              console.log(response);
            },
            error: (error) => {
              console.log("error in getting user")
              console.log(error);
            },
          })
        console.log("Refresh Token");
        // this.router.navigate(['/login']);
    }

    login(credentials: Body1) {
        return this.authApi.authLoginPost(credentials)
            .pipe(map(inlineResponse201 => {
                console.log(inlineResponse201);
                this.userSubject.next(inlineResponse201.user);
                this.tokenSubject.next(inlineResponse201.tokens);
                this.storeRefreshAccessTokenOnLocalStorage(inlineResponse201.tokens.refresh.token,inlineResponse201.tokens.access.token);
                this.startRefreshTokenTimer();
                return inlineResponse201.user;
            }));
    }

    logout() {
        this.authApi.authLogoutPost({refreshToken: this.tokenValue.refresh.token}).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.tokenSubject.next(null);
        this.removeRefreshAccessTokenOnLocalStorage();
        this.router.navigate(['/login']);
    }

    forgotPassword(email : string){
        return this.authApi.authForgotPasswordPost({email: email});
    }

    refreshToken(credentials: Body3) {
        return this.authApi.authRefreshTokensPost(credentials)
            .pipe(map((tokens) => {
                this.tokenSubject.next(tokens);
                this.storeRefreshAccessTokenOnLocalStorage(tokens.refresh.token, tokens.access.token);
                this.startRefreshTokenTimer();
            }));
    }

    public startRefreshTokenTimer() {
        const jwtAccessToken: Token = this.tokenValue.access; 
        const refreshToken: Token = this.tokenValue.access;

        // set a timeout to refresh the token a minute before it expires
        const expires = jwtAccessToken.expires;
        const timeout = Math.abs(new Date(expires).getTime() - new Date().getTime() - (60*1000));
        this.refreshTokenTimeout = setTimeout(() => {
            const first = this.refreshToken({refreshToken: refreshToken.token});
            const second = this.userApi.meGet();
            concat(first,second).subscribe();
        }, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    private storeRefreshAccessTokenOnLocalStorage(refreshToken: string, accessToken: string){
        localStorage.setItem('refresh-token', refreshToken);
        localStorage.setItem('access-token', accessToken);
    }

    private removeRefreshAccessTokenOnLocalStorage(){
        localStorage.setItem('refresh-token', '');
        localStorage.setItem('access-token', '');
    }

}