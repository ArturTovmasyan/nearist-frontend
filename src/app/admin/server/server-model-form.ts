import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ValidationService } from '../../shared';
import { BsModalRef } from 'ngx-bootstrap';

export enum ServerFormTypes {
    add = 1,
    edit
}

export class ServerForm {

    form: FormGroup;
    server: any;
    type: ServerFormTypes;
    inputs: any[] = [];

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router) {
    }

    initServerForm() {
        this.form = this.fb.group({
                'name': [this.server ? this.server.name : '', [Validators.required]],
                'description': [this.server ? this.server.description : '', [Validators.required]],
                'ip': [this.server ? this.server.ip : '', [ValidationService.ipValidator, Validators.required]],
                'ssh_port': [this.server ? this.server.ssh_port : '', [Validators.required]],
                'ftp_port': [this.server ? this.server.ftp_port : '', [Validators.required]],
                'iflex_ip': [this.server ? this.server.iflex_ip : '', [ValidationService.ipValidator]],
                'iflex_port': [this.server ? this.server.iflex_port : '', [Validators.required]],
                'iflex_secure': [this.server ? this.server.iflex_secure : '', []],
                'iflex_username': [this.server ? this.server.iflex_username : '', []],
                'iflex_password': [this.server ? this.server.iflex_password : '', []],
                'ipmi_ip': [this.server ? this.server.ipmi_ip : '', [ValidationService.ipValidator]],
                'ipmi_port': [this.server ? this.server.ipmi_port : '', []],
                'ipmi_secure': [this.server ? this.server.ipmi_secure : '', []],
                'ipmi_username': [this.server ? this.server.ipmi_username : '', []],
                'ipmi_password': [this.server ? this.server.ipmi_password : '', []],
            },
        );
    }

    submitServer(data: any) {

        switch (this.type) {
            case ServerFormTypes.add:
                this.addServer(data);
                break;
            case ServerFormTypes.edit:
                this.editServer(data);
                break;

        }
    }

    addServer(data) {
    }

    editServer(data) {
    }
}
