import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared';
import { BsModalRef } from 'ngx-bootstrap';

export enum BitstreamFormTypes {
    add = 1,
    edit
}

export class BitstreamModelForm {

    form: FormGroup;
    boardConfigs: any;
    type: BitstreamFormTypes;
    inputs: any[] = [];

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router) {
    }

    initBitStreamForm() {

        // create form validation
        this.form = this.fb.group({
                'board_type': [this.boardConfigs && this.boardConfigs.board_type ? this.boardConfigs.board_type[0].id : '', [Validators.required]],
                'status': [this.boardConfigs && this.boardConfigs.status ? this.boardConfigs.status[0].id : '', [Validators.required]],
                'description': [this.boardConfigs ? this.boardConfigs.description : '', [Validators.required]],
            }, {
                updateOn: 'blur',
                validateEvent: 'blur',
            }
        );
    }

    submitBitstream() {

        switch (this.type) {
            case BitstreamFormTypes.add:
                this.addBitstream();
                break;
            case BitstreamFormTypes.edit:
                this.editBitstream();
                break;
        }
    }

    addBitstream() {
    }

    editBitstream() {
    }
}
