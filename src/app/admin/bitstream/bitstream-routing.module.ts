import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitstreamComponent } from './bitstream.component';

const routes: Routes = [
    { path: '', component: BitstreamComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BitstreamRoutingModule {
}
