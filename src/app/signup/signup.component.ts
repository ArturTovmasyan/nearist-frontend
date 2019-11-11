import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    error: string;
    dashboardUrl: string;
    adminUrl: string;
    loginUrl: string;

    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.rePassword = '';
        this.error = '';
    }

    ngOnInit() {
        this.dashboardUrl = this.route.snapshot.queryParams['to'] || '/dashboard';
        this.adminUrl     = this.route.snapshot.queryParams['to'] || '/admin';
        this.loginUrl     = this.route.snapshot.queryParams['to'] || '/login';

        if (localStorage.getItem('at')) {
            if (localStorage.getItem('admin') == 'false') {
                this.router.navigate([this.dashboardUrl]);
            } else {
                this.router.navigate([this.adminUrl]);
            }
        }
    }

    signup() {
        let data = {
            'firstName': this.firstName,
            'lastName': this.lastName,
            'email': this.email,
            'password': this.password,
            'rePassword': this.rePassword,
        };

        this.authService.signup(data).subscribe(
            res => {
                this.router.navigate([this.loginUrl]);
            },
            error => {
                this.error = error.error.message;
            }
        );
    }
}
