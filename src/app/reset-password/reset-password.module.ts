import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ResetPasswordComponent
    ]
})
export class ResetPasswordModule { }
