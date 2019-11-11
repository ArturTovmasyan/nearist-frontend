import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ControlMessageComponent } from '../control-message/control-message.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { FileTypePipe } from './pipes/file-type.pipe';
import { DeviceTypePipe } from './pipes/device-type.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { NgxPasswordInputModule } from 'ngx-password-input';
import { BoardTypePipe } from './pipes/board-type.pipe';
import { TabsModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ServerLogsComponent } from '../admin/server/server-logs/server-logs.component';
import { BoardLaneMatrixComponent } from './modules/board-lane-matrix/board-lane-matrix.component';
import { BoardLaneMatrixModule } from './modules/board-lane-matrix/board-lane-matrix.module';

@NgModule({
    declarations: [
        ControlMessageComponent,
        ServerLogsComponent,
        FileTypePipe,
        DeviceTypePipe,
        BoardTypePipe,
        GroupByPipe,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AngularMultiSelectModule,
        Ng2Charts,
        NgxPasswordInputModule,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        BsDropdownModule.forRoot(),
        BoardLaneMatrixModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AngularMultiSelectModule,
        Ng2Charts,
        NgxPasswordInputModule,
        ControlMessageComponent,
        ServerLogsComponent,
        FileTypePipe,
        DeviceTypePipe,
        BoardTypePipe,
        GroupByPipe,
        TabsModule,
        PaginationModule,
        BsDropdownModule,
        BoardLaneMatrixComponent
    ]
})

export class SharedModule {
}
