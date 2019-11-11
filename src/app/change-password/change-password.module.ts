import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        ChangePasswordRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ChangePasswordComponent
    ]
})
export class ChangePasswordModule { }
