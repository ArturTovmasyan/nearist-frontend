import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { LogListComponent } from './log-list.component';
import { LogListRoutingModule } from './log-list-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      PageHeaderModule,
      LogListRoutingModule,
      SharedModule
  ],
  declarations: [LogListComponent]
})
export class LogListModule { }
