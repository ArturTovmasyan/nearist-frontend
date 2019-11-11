import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from '../../../shared';
import { Router } from '@angular/router';
import { ValidationService } from '../../../shared';
import { UserForm, UserFormTypes } from '../user-model-form';
import { BroadcasterService } from '../../../shared/services';

@Component({
    selector: 'app-user-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends UserForm implements OnInit, OnDestroy {
    @ViewChild('inputPassword') inputPassword: ElementRef;
    @ViewChild('inputApiKey') inputApiKey: ElementRef;

    error: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    organization: string;
    errorMessage: any;
    ready = false;
    dropdownSettings = {};
    currentUserId: number;
    formTitle: string;

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router,
                private broadcaster: BroadcasterService) {
        super(fb, bsModalRef, authService, router);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.form = null;
    }

    init(user: any, type: UserFormTypes = UserFormTypes.add, category: number) {
        this.user = user;
        this.type = type;
        this.currentUserId = +localStorage.getItem('uid');

        if (this.user) {

            this.firstName = this.user.first_name;
            this.lastName = this.user.last_name;
            this.userName = this.user.username;
            this.email = this.user.email;
            this.organization = this.user.organization;
            this.phone = this.user.phone;
        }

        this.errorMessage = null;
        this.initUserForm();

        switch (this.type) {
            case UserFormTypes.profile:
                this.initProfileFields();
                break;
        }
    }

    initProfileFields() {

        this.formTitle = 'Edit Profile';

        this.inputs = [
            {name: 'first_name', type: 'text'},
            {name: 'last_name', type: 'text'},
            {name: 'email', type: 'email'},
            {name: 'organization', type: 'text'},
            {name: 'phone', type: 'text'},
        ];
    }

    editProfile(data: any) {

        this.authService.editProfile(this.currentUserId, data)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {

                        this.broadcaster.broadcast('user', res.data.user);
                        const fullName = res.data.user.first_name + ' ' + res.data.user.last_name;
                        localStorage.setItem('uid', res.data.user.id);
                        localStorage.setItem('fullName', fullName);

                        this.broadcaster.broadcast('closeModal', true);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    updateValues() {

        const passwordValue = this.form.controls.password.value;
        if (!passwordValue) {
            const passwordNativeValue = this.inputPassword.nativeElement.value;
            if (passwordNativeValue) {
                this.form.controls.password.setValue(passwordNativeValue);
            }
        }
    }
}
