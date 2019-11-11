import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ValidationService } from '../../shared';
import { BsModalRef } from 'ngx-bootstrap';

export enum UserFormTypes {
    add = 1,
    edit,
    profile,
}

export class UserForm {

    form: FormGroup;
    user: any;
    type: UserFormTypes;
    userFormTypes: typeof UserFormTypes = UserFormTypes;

    inputs: any[] = [];

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router) {
    }

    initUserForm() {
        // create form validation
        this.form = this.fb.group({

                'first_name': [this.user ? this.user.first_name : null, [Validators.required]],
                'last_name': [this.user ? this.user.last_name : null, [Validators.required]],
                'email': [this.user ? this.user.email : null, [ValidationService.emailValidator, Validators.required]],
                'phone': [this.user ? this.user.phone : null, [ValidationService.phoneValidator, Validators.required]],
                'organization': [this.user ? this.user.organization : null, [Validators.required]]
            }, {
                updateOn: 'blur',
                validateEvent: 'blur',
            }
        );
    }

    addControls(names: any[]) {
        for (const name of names) {

            if (name === 'enabled') {
                this.form.addControl(
                    name, new FormControl(this.user ? this.user[name] : null, [])
                );
            } else {
                this.form.addControl(
                    name, new FormControl(this.user ? this.user[name] : null, [Validators.required])
                );
            }
        }
    }

    submitUser(data: any) {

        switch (this.type) {
            case UserFormTypes.profile:
                this.editProfile(data);
                break;
        }
    }

    editProfile(data) {
    }
}
