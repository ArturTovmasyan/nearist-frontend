import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, ValidationService} from "../shared/services";
import {ActivatedRoute, Router} from "@angular/router";
import {routerTransition} from '../router.animations';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    animations: [routerTransition()]
})
export class ResetPasswordComponent implements OnInit {
    form: FormGroup;
    hash: string;
    error: string;
    errorMessage: any;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}


    ngOnInit() {
        this.initSettingForm();
        this.errorMessage = null;

        this.hash = this.route.snapshot.queryParams["key"];
        this.getUser(this.hash);
    }

    initSettingForm() {
        this.form = this.fb.group({
            'newPassword': new FormControl('', [ValidationService.passwordValidator, Validators.required]),
            'confirmPassword': new FormControl('', [ValidationService.passwordValidator, Validators.minLength(8), Validators.required])
        },  {validator: ValidationService.passwordsEqualValidator})
    }

    getUser(hash: string) {
        this.authService.getUserByHash(hash)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (!res.status || res.status !== 200) {
                        this.router.navigate(['/not-found']);
                    }
                },
                error => {
                    this.router.navigate(['/not-found']);
                }
            );
    }

    resetPassword(data: any) {
        let d = Object.assign(data, {hash: this.hash});

        this.authService.confirmPassword(d)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 201) {
                        this.router.navigate(['/login']);
                    }
                },
                error => {
                    this.errorMessage = error.message;
                }
            );
    }
}
