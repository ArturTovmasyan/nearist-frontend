import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalModule} from 'ngx-bootstrap/modal';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        SharedModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}
