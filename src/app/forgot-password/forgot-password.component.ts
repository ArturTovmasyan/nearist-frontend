import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared";
import {routerTransition} from "../router.animations";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
    email: string;
    error: string;
    success: string;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router
    ) {
        this.email   = '';
        this.error   = '';
        this.success = '';
    }

    ngOnInit() {

    }

    sendEmail() {
        this.authService.forgotPassword({'email': this.email}).subscribe(
            res => {
                this.success = res.message;
            },
            error => {
                this.error = error.error.message;
            }
        );
    }
}
