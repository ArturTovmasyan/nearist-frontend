import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerDashboardComponent } from './server-dashboard.component';

const routes: Routes = [
    { path: '', component: ServerDashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ServerDashboardRoutingModule {
}
