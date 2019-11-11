import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {ModalModule} from 'ngx-bootstrap/modal';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {ChangePasswordComponent} from './users/change-password/change-password.component';
import {ManageComponent as UserManageComponent} from './users/manage/manage.component';
import {ManageComponent as ServerManageComponent} from './server/manage/manage.component';
import {ManageComponent as BitstreamManageComponent} from './bitstream/manage/manage.component';
import {ManageComponent as ReservationManageComponent} from './reservation/manage/manage.component';
import {ManageComponent as BitstreamStatusManageComponent} from './settings/bitstream-status/manage/manage.component';
import {ServerTemperatureComponent} from './server/server-temperature/server-temperature.component';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxMaskModule} from 'ngx-mask';
import {ServerLoadBitstreamComponent} from './server/server-load-bitstream/server-load-bitstream.component';
import {ServerPowerConfigComponent} from './server/server-power-config/server-power-config.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
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
        ServerManageComponent,
        ServerTemperatureComponent,
        BitstreamManageComponent,
        ReservationManageComponent,
        ServerLoadBitstreamComponent,
        ServerPowerConfigComponent,
        BitstreamStatusManageComponent,
    ],
    declarations: [
        AdminComponent,
        SidebarComponent,
        HeaderComponent,
        UserManageComponent,
        ChangePasswordComponent,
        ServerManageComponent,
        ServerTemperatureComponent,
        BitstreamManageComponent,
        ReservationManageComponent,
        ServerLoadBitstreamComponent,
        ServerPowerConfigComponent,
        BitstreamStatusManageComponent,
    ]
})

export class AdminModule {
}
