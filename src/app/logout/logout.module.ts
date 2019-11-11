import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        LogoutRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        SharedModule
    ],
    declarations: [
        LogoutComponent
    ]
})
export class LogoutModule { }
