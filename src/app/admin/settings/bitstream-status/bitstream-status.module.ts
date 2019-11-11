import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BitstreamStatusRoutingModule} from './bitstream-status-routing.module';
import {PageHeaderModule} from '../../../shared/index';
import {SharedModule} from '../../../shared/shared.module';
import {BitstreamStatusComponent} from './bitstream-status.component';

@NgModule({
    imports: [
        CommonModule,
        BitstreamStatusRoutingModule,
        PageHeaderModule,
        SharedModule
    ],
    declarations: [BitstreamStatusComponent]
})

export class BitstreamStatusModule {
}
