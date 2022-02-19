import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from './common/AuthUser';
import { AuthService } from './sevices/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'simple-app';

    currentUser: AuthUser;

    constructor(private authService: AuthService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('userInfo'));
    }

    logout() {
        const header = {
            Authorization: 'Bearer ' + localStorage.getItem('userInfo')
        };
        this.authService.logout();
        this.router.navigate(['login']);
    }

}
