import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { ServerComponent } from './server.component';
import { ServerRoutingModule } from './server-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ServerRoutingModule,
        PageHeaderModule,
        SharedModule
    ],
    declarations: [ServerComponent]
})

export class ServerModule {}
