import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, ValidationService} from "../shared/services";
import {ActivatedRoute, Router} from "@angular/router";
import {routerTransition} from '../router.animations';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    animations: [routerTransition()]
})
export class ChangePasswordComponent implements OnInit {
    form: FormGroup;
    hash: string;
    error: string;
    errorMessage: any;
    userId: number;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}


    ngOnInit() {
        this.errorMessage = null;
        this.userId       = parseInt(localStorage.getItem('uid'));

        this.checkUser();
        this.initSettingForm();
    }

    initSettingForm() {
        this.form = this.fb.group({
            'password': new FormControl('', [ValidationService.passwordValidator]),
            'newPassword': new FormControl('', [ValidationService.passwordValidator, Validators.required]),
            'confirmPassword': new FormControl('', [ValidationService.passwordValidator, Validators.minLength(8), Validators.required])
        },  {validator: ValidationService.passwordsEqualValidator})
    }

    checkUser() {
        if (this.userId) {
            this.authService.getUserById(this.userId)
                .subscribe(
                    res => {
                        this.errorMessage = null;

                        if (!res.status || res.status !== 200 || res.data.user.verified) {
                            this.router.navigate(['/login']);
                        }
                    },
                    error => {
                        this.errorMessage = error.data.errors;
                    }
                );
        } else {
            this.router.navigate(['/login']);
        }
    }

    changePassword(data: any) {
        data['id'] = +this.userId;

        this.authService.changePassword(data)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 201) {
                        localStorage.removeItem('unverified');
                        this.router.navigate(['/dashboard']);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }
}
