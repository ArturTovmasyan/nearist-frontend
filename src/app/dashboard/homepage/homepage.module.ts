import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { SharedModule } from '../../shared/shared.module';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  imports: [
      CommonModule,
      PageHeaderModule,
      HomepageRoutingModule,
      SharedModule
  ],
  declarations: [HomepageComponent]
})
export class HomepageModule { }
