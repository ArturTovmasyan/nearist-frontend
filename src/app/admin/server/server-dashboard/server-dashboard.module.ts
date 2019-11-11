import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerDashboardRoutingModule } from './server-dashboard-routing.module';
import { ServerDashboardComponent } from './server-dashboard.component';
import { PageHeaderModule } from '../../../shared';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      ServerDashboardRoutingModule,
      PageHeaderModule,
      SharedModule
  ],
  declarations: [ServerDashboardComponent]
})
export class ServerDashboardModule { }
