import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { SharedModule } from '../../shared/shared.module';
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation-routing.module';

@NgModule({
  imports: [
      CommonModule,
      PageHeaderModule,
      DocumentationRoutingModule,
      SharedModule
  ],
  declarations: [DocumentationComponent]
})
export class DocumentationModule { }
