import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {ModalModule} from 'ngx-bootstrap/modal';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {ChangePasswordComponent} from './users/change-password/change-password.component';
import {ManageComponent as UserManageComponent} from './users/manage/manage.component';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ModalModule.forRoot(),
        NgbDropdownModule.forRoot(),
        SharedModule,
        CalendarModule,
        CheckboxModule,
        AutoCompleteModule,
        NgxMaskModule.forRoot()
    ],
    entryComponents: [
        UserManageComponent,
        ChangePasswordComponent,
    ],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        UserManageComponent,
        ChangePasswordComponent,
    ]
})

export class DashboardModule {
}
