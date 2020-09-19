import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { CustomUserService } from '@app/_services/custom';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;

    constructor(private userService: CustomUserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getMe().pipe(first()).subscribe(user => {
            this.loading = false;
            this.user = user;
        });
    }
}