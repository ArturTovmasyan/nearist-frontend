import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationFormTypes, ReservationModelForm } from '../reservation-model-form';
import { BroadcasterService, AuthService } from '../../../shared/services';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends ReservationModelForm implements OnInit, OnDestroy {

    errorMessage: any;
    userList = [];
    serverList = [];
    boardConfigList = [];
    boardList = [];
    laneList = [];
    form: FormGroup;

    selectedUser = [];
    selectedServer = [];
    selectedBoardConfig = [];

    userSelectSettings = {};
    serverSelectSettings = {};
    boardConfigSelectSettings = {};
    boardSelectSettings = {};
    laneSelectSettings = {};

    editId: number;
    formTitle: string;
    boardDetailChecked = false;
    reservationData = [];
    module: string;

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router,
                protected broadcaster: BroadcasterService) {
        super(fb, bsModalRef, authService, router);
    }

    ngOnInit() {

        // set each select field config
        this.userSelectSettings = {
            singleSelection: true,
            text: 'Select User',
        };

        this.serverSelectSettings = {
            singleSelection: true,
            text: 'Select Server',
        };

        this.boardConfigSelectSettings = {
            singleSelection: true,
            text: 'Select Bitstream',
        };

        this.boardSelectSettings = {
            singleSelection: false,
            text: 'Select Board',
        };

        this.laneSelectSettings = {
            singleSelection: false,
            text: 'Select Lane',
        };
    }

    ngOnDestroy() {
        this.form = null;
    }

    init(selectListData, reservation, reservationData, type: ReservationFormTypes = ReservationFormTypes.add, module) {

        this.module = module;

        if (selectListData) {
            this.serverList = selectListData.servers;
            this.userList = selectListData.users;
            this.boardConfigList = selectListData.board_config_list;
            this.boardList = selectListData.board_list;
            this.laneList = selectListData.lane_list;
        }

        this.reservationData = reservationData;

        if (this.reservationData.length > 0) {
            this.boardDetailChecked = true;
        }

        this.errorMessage = null;
        this.reservation = reservation;
        this.type = type;

        if (this.type === ReservationFormTypes.edit && this.reservation) {

            const startDate = this.reservation.start_date;
            const endDate = this.reservation.end_date;

            this.startDate = this.generateUTCDate(startDate);
            this.endDate = this.generateUTCDate(endDate);
            this.editId = this.reservation.id;

            // generate selected data for list
            this.selectedUser = [
                {'id': this.reservation.user.id, 'itemName': this.reservation.user.itemName},
            ];

            this.selectedServer = [
                {'id': this.reservation.server.id, 'itemName': this.reservation.server.name},
            ];

            if (this.reservation.board_config) {
                this.selectedBoardConfig = [
                    {'id': this.reservation.board_config.data.id, 'itemName': this.reservation.board_config.data.itemName},
                ];
            }
        }
        this.initReservationForm();

        switch (this.type) {
            case ReservationFormTypes.add:
                this.initAddReservationFields();
                break;
            case ReservationFormTypes.edit:
                this.initEditReservationFields();
                break;
        }
    }

    /**
     * This function is used to generate UTC format date for edit form
     *
     * @param {string} formDate
     * @returns {Date}
     */
    generateUTCDate(formDate: any) {

        const splitDate = formDate.split(' ');
        const date = splitDate[0];
        const time = splitDate[1];
        const splitedDate = date.split('-');
        const splitedTime = time.split(':');

        const year = splitedDate[0];
        const month = splitedDate[1] - 1;
        const day = splitedDate[2];

        const hour   = splitedTime[0];
        const minute = splitedTime[1];
        const second = splitedTime[2];

        return new Date(Date.UTC(year, +month, day, hour, minute, second));
    }

    initAddReservationFields() {
        if (this.module === 'reservation') {
            this.formTitle = 'Add Reservation';
        } else {
            this.formTitle = 'Add Event';
        }
    }

    initEditReservationFields() {
        if (this.module === 'reservation') {
            this.formTitle = 'Edit Reservation';
        } else {
            this.formTitle = 'Edit Event';
        }
    }

    addReservation() {
        if (this.reservationData.length > 0) {
            this.form.value.board_data = this.reservationData;
            this.authService.addReservation(this.form.value)
                .subscribe(
                    res => {
                        this.errorMessage = null;

                        if (res.status && res.status === 200) {
                            this.broadcaster.broadcast('closeModal', this.module);
                        }
                    },
                    error => {
                        this.errorMessage = error.error.data.errors;
                    }
                );
        }

    }

    editReservation() {
        if (this.reservationData.length > 0) {
            this.form.value.board_data = this.reservationData;
            this.authService.editReservation(this.editId, this.form.value)
                .subscribe(
                    res => {
                        this.errorMessage = null;

                        if (res.status && res.status === 200) {
                            this.broadcaster.broadcast('closeModal', this.module);
                        }
                    },
                    error => {
                        this.errorMessage = error.error.data.errors;
                    }
                );
        }
    }
}
