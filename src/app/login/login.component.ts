import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {routerTransition} from '../router.animations';
import {AuthService} from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})

export class LoginComponent implements OnInit {
    username: string;
    password: string;
    error: string;
    dashboardUrl: string;
    adminUrl: string;
    changePasswordUrl: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router
    ) {
        this.username = '';
        this.password = '';
        this.error = '';
    }

    ngOnInit() {
        this.dashboardUrl      = this.route.snapshot.queryParams['to'] || '/dashboard';
        this.adminUrl          = this.route.snapshot.queryParams['to'] || '/admin/servers';
        this.changePasswordUrl = '/change-password';
    }

    login() {
        this.authService.auth({'username': this.username, 'password': this.password})
            .subscribe(
            res => {
                if (res.data) {
                    localStorage.setItem('at', res.data.token.access_token);

                    if (res.data.user) {
                        const fullName = res.data.user.first_name + ' ' + res.data.user.last_name;
                        localStorage.setItem('fullName', fullName);
                        localStorage.setItem('uid', res.data.user.id);
                        localStorage.setItem('admin', res.data.user.admin);

                        if (res.data.user.admin) {
                            this.router.navigate([this.adminUrl]);
                        } else {
                            if (res.data.user.verified) {
                                localStorage.removeItem('unverified');
                                this.router.navigate([this.dashboardUrl]);
                            } else {
                                localStorage.setItem('unverified', "1");
                                this.router.navigate([this.changePasswordUrl]);
                            }
                        }
                    }
                }
            },
            error => {
                this.error = error.error.message;
            }
        );
    }
}
