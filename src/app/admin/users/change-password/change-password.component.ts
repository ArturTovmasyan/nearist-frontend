import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, ValidationService} from '../../../shared';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    form: FormGroup;
    error: string;
    errorMessage: any;

    constructor(
        private fb: FormBuilder,
        public bsModalRef: BsModalRef,
        private authService: AuthService,
        private router: Router
    ) {}



    ngOnInit() {
        this.initSettingForm();
        this.errorMessage = null;
    }

    initSettingForm() {

        // create form validation
        this.form = this.fb.group({
                'password': ['', [Validators.required]],
                'newPassword': ['', [ValidationService.passwordValidator, Validators.required]],
                'confirmPassword': ['', [ValidationService.passwordValidator, Validators.minLength(8), Validators.required]],
            }, {validator: ValidationService.passwordsEqualValidator}
        );
    }


    changePassword(data: any) {

        // add current user id in data
        data['id'] = +localStorage.getItem('uid');

        this.authService.changePassword(data)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 201) {
                        this.bsModalRef.hide();
                        this.router.navigate(['/admin']);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }
}
