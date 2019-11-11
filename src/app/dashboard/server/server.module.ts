import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { SharedModule } from '../../shared/shared.module';
import { ServerComponent } from './server.component';
import { ServerRoutingModule } from './server-routing.module';

@NgModule({
  imports: [
      CommonModule,
      PageHeaderModule,
      ServerRoutingModule,
      SharedModule
  ],
  declarations: [ServerComponent]
})
export class ServerModule { }
