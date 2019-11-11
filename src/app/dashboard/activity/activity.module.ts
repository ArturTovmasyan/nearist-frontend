import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { SharedModule } from '../../shared/shared.module';
import { ActivityComponent } from './activity.component';
import { ActivityRoutingModule } from './activity-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
      InfiniteScrollModule,
      CommonModule,
      PageHeaderModule,
      ActivityRoutingModule,
      SharedModule
  ],
  declarations: [ActivityComponent]
})
export class ActivityModule { }
