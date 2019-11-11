import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { SharedModule } from '../../shared/shared.module';
import { ReservationComponent } from './reservation.component';
import { ReservationRoutingModule } from './reservation-routing.module';

@NgModule({
  imports: [
      CommonModule,
      ReservationRoutingModule,
      PageHeaderModule,
      SharedModule
  ],
  declarations: [ReservationComponent]
})

export class ReservationModule { }
