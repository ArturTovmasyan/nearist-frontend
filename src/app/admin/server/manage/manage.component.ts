import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {AuthService, BroadcasterService} from '../../../shared';
import {Router} from '@angular/router';
import {ServerForm, ServerFormTypes} from '../server-model-form';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})


export class ManageComponent extends ServerForm implements OnInit, OnDestroy {

    error: string;
    errorMessage: any;
    editServerId: number;
    ready = false;
    currentServerId: number;
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

    init(server: any, type: ServerFormTypes = ServerFormTypes.add) {

        this.server = server;
        this.type = type;
        this.currentServerId = +localStorage.getItem('sid');

        if (this.server) {
            this.editServerId = +this.server.id;
        }

        this.errorMessage = null;
        this.initServerForm();

        this.inputs = [
            {name: 'name', type: 'text'},
            {name: 'description', type: 'text'},
            {name: 'ip', type: 'text'},
            {name: 'ssh_port', type: 'number'},
            {name: 'ftp_port', type: 'number'},
            {
                type: 'group',
                name: 'iflex',
                legend: 'iflex',
                fields: [
                    {
                        type: 'input-group',
                        legend: 'iflex_port',
                        prepend: [],
                        fields: [
                            {name: 'iflex_ip', type: 'text', size: 'lg'},
                            {name: 'iflex_port', type: 'number', size: 'sm', min: 0, max: 65535},
                        ],
                        append: [
                            {name: 'iflex_secure', type: 'checkbox', append: true}
                        ],
                    },
                    {name: 'iflex_username', type: 'text'},
                    {name: 'iflex_password', type: 'password'}
                ]
            },
            {
                type: 'group',
                name: 'ipmi',
                legend: 'ipmi',
                fields: [
                    {
                        type: 'input-group',
                        legend: 'ipmi_address',
                        prepend: [],
                        fields: [
                            {name: 'ipmi_ip', type: 'text', size: 'lg'},
                            {name: 'ipmi_port', type: 'number', size: 'sm', min: 0, max: 65535},
                        ],
                        append: [
                            {name: 'ipmi_secure', type: 'checkbox', append: true}
                        ],
                    },
                    {name: 'ipmi_username', type: 'text'},
                    {name: 'ipmi_password', type: 'password'}
                ]
            }
        ];

        switch (this.type) {
            case ServerFormTypes.add:
                this.initAddServerFields();
                break;
            case ServerFormTypes.edit:
                this.initEditServerFields();
                break;
        }
    }


    initAddServerFields() {
        this.formTitle = 'Add Server';
    }

    initEditServerFields() {
        this.formTitle = 'Edit Server';
    }

    addServer(data) {
        if (data.iflex_secure == null) {
            data.iflex_secure = false;
        }

        if (data.ipmi_secure == null) {
            data.ipmi_secure = false;
        }

        this.authService.addServer(data)
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

    editServer(data) {
        this.authService.editServer(this.editServerId, data)
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

    checkCheckbox(e, field_name) {
        this.form.value[field_name] = e.target.checked;
    }
}
