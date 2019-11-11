import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        SharedModule
    ],
    declarations: [
        ForgotPasswordComponent
    ]
})
export class ForgotPasswordModule { }
