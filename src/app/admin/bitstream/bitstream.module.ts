import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitstreamRoutingModule } from './bitstream-routing.module';
import { PageHeaderModule } from '../../shared';
import { SharedModule } from '../../shared/shared.module';
import { BitstreamComponent } from './bitstream.component';

@NgModule({
  imports: [
      CommonModule,
      BitstreamRoutingModule,
      PageHeaderModule,
      SharedModule
  ],
  declarations: [BitstreamComponent]
})

export class BitstreamModule { }
