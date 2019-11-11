import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitstreamStatusComponent } from './bitstream-status.component';

const routes: Routes = [
    { path: '', component: BitstreamStatusComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BitstreamStatusRoutingModule {
}
