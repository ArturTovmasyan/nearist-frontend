import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        SharedModule,
    ],
    declarations: [
    ],
})

export class UsersModule {}
