import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../../shared';
import { BroadcasterService } from '../../shared';
import { ManageComponent } from './manage/manage.component';
import { ReservationFormTypes } from './reservation-model-form';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  animations: [routerTransition()]
})

export class ReservationComponent implements OnInit, OnDestroy {
    objectKeys = Object.keys;

    ready = false;
    empty = false;
    reservations: any;
    bsModalRef: BsModalRef;
    subscription: any;
    removeId: number;
    loadId: number;
    error: any;
    module = 'reservation';
    errorMessage: any;
    events: any[];

    constructor(protected authService: AuthService,
                protected modalService: BsModalService,
                protected broadcaster: BroadcasterService) {

        this.subscription = this.broadcaster.on('closeModal');
        this.subscription.subscribe(
            (data) => {
                this.closeModal();
                if (data === 'reservation') {
                    this.getReservationList();
                } else {
                    this.loadEvents();
                }
            });
    }

    ngOnInit() {
        this.getReservationList();
        this.ready = false;
        this.empty = false;
    }

    loadEvents() {
        this.authService.getCalendarEvents()
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {
                        this.events = res.data;
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    removeReservation(id) {
        if (id) {
            this.authService.removeReservation(id)
                .subscribe(
                    () => {
                        this.getReservationList();
                    },
                    error => {
                        this.error = 'Cant';
                        console.error(error);
                    }
                );
        }
    }

    getReservationList() {
        this.authService.getReservations()
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {

                        this.reservations = res.data;

                        if (this.reservations && this.reservations.length > 0) {
                            this.ready = true;
                        } else {
                            this.empty = true;
                        }
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

    openModal() {
        this.authService.getListDataForSelection()
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {
                        this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
                        this.bsModalRef.content.init(res.data, {}, [], ReservationFormTypes.add, this.module);
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

    closeModal() {
        this.modalService.hide(1);
    }

    openConfirmModal(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.removeId = +id;
        }
    }

    editReservation(id: number) {
        this.authService.getReservationById(id)
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {
                        const reservation = res.data;
                        this.authService.getListDataForSelection()
                            .subscribe(
                                data => {
                                    if (data.status && data.status === 200) {
                                        this.bsModalRef = this.modalService.show(ManageComponent, { ignoreBackdropClick: true });
                                        this.bsModalRef.content.init(
                                            data.data, reservation,
                                            reservation.reservation_data,
                                            ReservationFormTypes.edit, this.module);
                                    }
                                },
                                error => {
                                    console.error(error);
                                }
                            );
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

    confirm(): void {
        this.bsModalRef.hide();
        this.removeReservation(this.removeId);
    }

    decline(): void {
        this.bsModalRef.hide();
    }

    loadConfig(id) {
        if (id) {
            this.authService.loadConfiguration(id)
                .subscribe(
                    () => {
                        this.getReservationList();
                    },
                    error => {
                        this.error = 'Cant';
                        console.error(error);
                    }
                );
        }
    }

    loadConfigModal(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.loadId = +id;
        }
    }

    loadConfigConfirm(): void {
        this.bsModalRef.hide();
        this.loadConfig(this.loadId);
    }

    loadConfigDecline(): void {
        this.bsModalRef.hide();
    }
}
