import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';
import { PercentagePipe } from '../../../shared/pipes/percentage.pipe';
import { PageHeaderModule } from '../../../shared';
import { ServerStatusComponent } from './server-status.component';
import { ServerStatusRoutingModule } from './server-status-routing.module';

@NgModule({
    imports: [CommonModule, ServerStatusRoutingModule, PageHeaderModule],
    declarations: [ServerStatusComponent, FileSizePipe, PercentagePipe]
})

export class ServerStatusModule {}
