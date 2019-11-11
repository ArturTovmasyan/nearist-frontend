import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared';
import { BsModalRef } from 'ngx-bootstrap';
import { ValidationService } from '../../shared';

export enum ReservationFormTypes {
    add = 1,
    edit
}

export class ReservationModelForm {

    form: FormGroup;
    reservation: any;
    type: ReservationFormTypes;
    startDate: any;
    endDate: any;

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router) {
    }

    initReservationForm() {

        // create form validation
        this.form = this.fb.group({
                'user': [this.reservation && this.reservation.user ? this.reservation.user : '', [Validators.required]],
                'server': [this.reservation ? this.reservation.server : '', [Validators.required]],
                'board_configuration': [this.reservation ? this.reservation.board_configuration : '', [Validators.required]],
                'start_date': [this.reservation ? this.startDate : null, [Validators.required]],
                'end_date': [this.reservation ? this.endDate : null, [Validators.required]],
            }, {
                updateOn: 'blur',
                validateEvent: 'blur',
                validator: ValidationService.reservationDatesValidator
            }
        );
    }

    submitReservation() {

        switch (this.type) {
            case ReservationFormTypes.add:
                this.addReservation();
                break;
            case ReservationFormTypes.edit:
                this.editReservation();
                break;
        }
    }

    addReservation() {
    }

    editReservation() {
    }
}
