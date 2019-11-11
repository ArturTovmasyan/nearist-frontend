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
    apiKey: string;
    country: number;
    state: number;
    city: number;
    address: string;
    zip: string;
    phone: string;
    roles: any;
    diskQuota: number;
    organization: string;
    password: string;
    enabled = true;
    errorMessage: any;
    editUserId: number;
    ready = false;
    rolesList = [];
    selectedItems = [];
    dropdownSettings = {};
    currentUserId: number;
    formTitle: string;
    userCategory: number;
    countryOptions = [];
    stateOptions = [];
    cityOptions = [];

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

        this.userCategory = category;

        this.user = user;
        this.type = type;
        this.currentUserId = +localStorage.getItem('uid');

        if (this.user) {

            this.firstName = this.user.first_name;
            this.lastName = this.user.last_name;
            this.userName = this.user.username;
            this.email = this.user.email;
            this.diskQuota = this.user.disk_quota;
            this.organization = this.user.organization;
            this.apiKey = this.user.api_key;
            this.phone = this.user.phone;
            this.country = this.user.country ? this.user.country.id : 0;
            this.state = this.user.state ? this.user.state.id : 0;
            this.city = this.user.city ? this.user.city.id : 0;
            this.address = this.user.address ? this.user.address : '';
            this.zip = this.user.zip ? this.user.zip : '';
            this.enabled = this.user.enabled;
            this.editUserId = +this.user.id;
            this.roles = this.user.roles_select;
            this.selectedItems = this.roles;
            this.address = this.user.address;
            this.zip = this.user.zip;

            if (this.country) {
                this.getStates(this.country);
            }

            if (this.state) {
                this.getCities(this.state);
            }
        }

        this.errorMessage = null;
        this.initUserForm();

        switch (this.type) {
            case UserFormTypes.add:
                this.initAddUserFields();
                break;
            case UserFormTypes.edit:
                this.initEditUserFields();
                break;
            case UserFormTypes.profile:
                this.initProfileFields();
                break;
        }

        this.getCountries();
    }

    initAddUserFields() {
        this.formTitle = 'Add User';

        this.rolesList = [
            {'id': 1, 'itemName': 'ROLE_USER'},
            {'id': 2, 'itemName': 'ROLE_ADMIN'},
            {'id': 3, 'itemName': 'ROLE_IMT_ADMIN'}
        ];

        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Roles',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: ''
        };

        this.inputs = [
            {name: 'first_name', type: 'text'},
            {name: 'last_name', type: 'text'},
            {name: 'username', type: 'text'},
            {name: 'email', type: 'email'},
            {name: 'password', type: 'password'},
            {name: 'api_key', type: 'text'},
            {name: 'disk_quota', type: 'number'},
            {name: 'organization', type: 'text'},
            {name: 'phone', type: 'text'},
            {name: 'country', type: 'number'},
            {name: 'state', type: 'number'},
            {name: 'city', type: 'number'},
            {name: 'address', type: 'string'},
            {name: 'zip', type: 'string'},
        ];

        if (this.userCategory === 1) {
            this.addControls(['username', 'enabled']);

        } else if (this.userCategory === 2) {
            this.addControls(['username', 'roles_select', 'enabled']);

        }

        this.form.addControl('password', new FormControl('', {
            validators: [
                ValidationService.passwordValidator, Validators.minLength(8), Validators.required
            ]
        }));
    }

    initEditUserFields() {

        this.formTitle = 'Edit User';

        this.rolesList = [
            {'id': 1, 'itemName': 'ROLE_USER'},
            {'id': 2, 'itemName': 'ROLE_ADMIN'},
            {'id': 3, 'itemName': 'ROLE_IMT_ADMIN'}
        ];

        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Roles',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: ''
        };

        this.inputs = [
            {name: 'first_name', type: 'text'},
            {name: 'last_name', type: 'text'},
            {name: 'username', type: 'text'},
            {name: 'email', type: 'email'},
            {name: 'api_key', type: 'text'},
            {name: 'disk_quota', type: 'number'},
            {name: 'organization', type: 'text'},
            {name: 'phone', type: 'text'},
            {name: 'country', type: 'number'},
            {name: 'state', type: 'number'},
            {name: 'city', type: 'number'},
            {name: 'address', type: 'string'},
            {name: 'zip', type: 'string'},
        ];

        if (this.userCategory === 1) {
            this.addControls(['username', 'enabled']);

        } else if (this.userCategory === 2) {
            this.addControls(['username', 'roles_select', 'enabled']);

        }
    }

    initProfileFields() {

        this.formTitle = 'Edit Profile';

        this.inputs = [
            {name: 'first_name', type: 'text'},
            {name: 'last_name', type: 'text'},
            {name: 'email', type: 'email'},
            {name: 'api_key', type: 'text', options: {}},
            {name: 'disk_quota', type: 'number', options: {}},
            {name: 'organization', type: 'text'},
            {name: 'phone', type: 'text'},
            {name: 'country', type: 'number'},
            {name: 'state', type: 'number'},
            {name: 'city', type: 'number'},
            {name: 'address', type: 'text'},
            {name: 'zip', type: 'text'},
        ];
    }

    addUser(data) {
        data.user_category = this.userCategory;
        data.country = this.country;
        data.state = this.state;
        data.city = this.city;

        this.authService.addUser(data)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {
                        this.broadcaster.broadcast('closeModal', true);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    editUser(data) {
        data.user_category = this.userCategory;
        data.country = this.country;
        data.state = this.state;
        data.city = this.city;

        this.authService.editUser(this.editUserId, data)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {
                        this.broadcaster.broadcast('closeModal', true);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    editProfile(data: any) {
        data.country = this.country;
        data.state = this.state;
        data.city = this.city;

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
        if (this.form.controls.password != undefined) {
            const passwordValue = this.form.controls.password.value;
            if (!passwordValue) {
                const passwordNativeValue = this.inputPassword.nativeElement.value;
                if (passwordNativeValue) {
                    this.form.controls.password.setValue(passwordNativeValue);
                }
            }
        }

        const apiKeyValue = this.form.controls.api_key.value;
        if (!apiKeyValue) {
            const apiKeyNativeValue = this.inputApiKey.nativeElement.value;
            if (apiKeyNativeValue) {
                this.form.controls.api_key.setValue(apiKeyNativeValue);
            }
        }
    }

    getCountries() {
        this.authService.getCountries()
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {
                        this.countryOptions = res.data.countries;
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    getStates(event) {
        if (event.target) {
            this.country = event.target.value;
        } else {
            this.country = event;
        }

        this.stateOptions = [];
        this.cityOptions  = [];

        this.authService.getStates(this.country)
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {
                        this.stateOptions = res.data.states;
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    /**
     * @param event
     */
    getCities(event) {
        if (event.target) {
            this.state = event.target.value;
        } else {
            this.state = event;
        }

        this.authService.getCities(this.country, this.state)
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {
                        this.cityOptions = res.data.cities;
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    /**
     * @todo it's a temporary method for define city from form, will be remove after reactive form integration
     * @param event
     */
    updateCity(event) {
        if (event.target) {
            this.city = event.target.value;
        } else {
            this.city = event;
        }
    }
}
