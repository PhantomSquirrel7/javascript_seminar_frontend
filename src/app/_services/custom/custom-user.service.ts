import { Injectable } from '@angular/core';
import { UserService } from '../swagger-api/api';


@Injectable({ providedIn: 'root' })
export class CustomUserService {

    constructor(private userService: UserService) { }
    getMe() {
       return this.userService.meGet();
    }

}