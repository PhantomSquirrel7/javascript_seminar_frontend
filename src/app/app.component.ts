import { Component } from '@angular/core';

import { CustomAuthenticationService } from './_services/custom';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private authenticationService: CustomAuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout();
    }
}