import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/index';
import {BsModalRef} from 'ngx-bootstrap';
import {BitstreamFormTypes} from '../../bitstream/bitstream-model-form';

export enum FormTypes {
    add = 1,
    edit
}

export class BitstreamStatusModelForm {
    form: FormGroup;
    type: FormTypes;
    entity: any;

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router) {
    }

    initForm() {
        this.form = this.fb.group({
                'title': [this.entity ? this.entity.title : '', [Validators.required]],
            }, {
                updateOn: 'blur',
                validateEvent: 'blur',
            }
        );
    }

    submit() {
        switch (this.type) {
            case FormTypes.add:
                this.add();
                break;
            case FormTypes.edit:
                this.edit();
                break;
        }
    }

    add() {
    }

    edit() {
    }
}
