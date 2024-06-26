import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServerStatusComponent} from './server-status.component';

const routes: Routes = [
    { path: '', component: ServerStatusComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServerStatusRoutingModule {
}
