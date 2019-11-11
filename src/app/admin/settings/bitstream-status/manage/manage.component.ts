import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../shared/index';
import {BsModalRef} from 'ngx-bootstrap';
import {BroadcasterService} from '../../../../shared/index';
import {Router} from '@angular/router';
import {BitstreamStatusModelForm, FormTypes} from '../bitstream-status-model-form';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends BitstreamStatusModelForm implements OnInit, OnDestroy {
    formTitle: string;

    errorMessage: any;

    entity: any;

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

    init(entity: any, type: FormTypes = FormTypes.add) {
        this.errorMessage = null;

        this.type = type;

        this.entity = entity;

        this.initForm();

        switch (this.type) {
            case FormTypes.add:
                this.initAddFields();
                break;
            case FormTypes.edit:
                this.initEditFields();
                break;
        }
    }

    initAddFields() {
        this.formTitle = 'Add Bitstream Status';
    }

    initEditFields() {
        this.formTitle = 'Edit Bitstream Status';
    }

    add() {
        this.authService.addBitstreamStatus(this.form.value)
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

    edit() {
        this.authService.editBitstreamStatus(this.entity.id, this.form.value)
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
}
