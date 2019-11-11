import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationCalendarRoutingModule } from './reservation-calendar-routing.module';
import { PageHeaderModule } from '../../../shared';
import { SharedModule } from '../../../shared/shared.module';
import { CalendarComponent } from './calendar.component';

import {ScheduleModule} from 'primeng/schedule';

@NgModule({
    imports: [
        CommonModule,
        ReservationCalendarRoutingModule,
        PageHeaderModule,
        ScheduleModule,
        SharedModule,
    ],
    declarations: [
        CalendarComponent
    ],
})

export class ReservationCalendarModule {
}
