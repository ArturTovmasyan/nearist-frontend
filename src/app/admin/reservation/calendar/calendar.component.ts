import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AuthService } from '../../../shared';
import { ReservationComponent } from '../reservation.component';
import { BsModalService } from 'ngx-bootstrap';
import { BroadcasterService } from '../../../shared';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    animations: [routerTransition()]
})

export class CalendarComponent extends ReservationComponent implements OnInit {

    headerConfig: any;
    events: any;
    options: any;
    constructor(protected authService: AuthService,
                protected modalService: BsModalService,
                protected broadcaster: BroadcasterService) {
        super(authService, modalService, broadcaster);
    }

    ngOnInit() {
        this.module = 'calendar';
        this.loadEvents();

        this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        this.options = {
            timeFormat: 'H(:mm)',
            eventTextColor: 'white',
            eventBackgroundColor: '#2399e5'
        };
    }

    handleEventClick(e) {
        const reservationId = e.calEvent.reservation_id;

        if (reservationId) {
            this.editReservation(reservationId);
        }
    }
}
