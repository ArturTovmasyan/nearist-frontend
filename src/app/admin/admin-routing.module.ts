import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: ''},
            { path: 'dashboard/:id', loadChildren: './server/server-dashboard/server-dashboard.module#ServerDashboardModule', canActivate: [AuthGuard] },
            { path: 'servers', loadChildren: './server/server.module#ServerModule', canActivate: [AuthGuard] },
            { path: 'bitstream', loadChildren: './bitstream/bitstream.module#BitstreamModule', canActivate: [AuthGuard] },
            { path: 'server-status/:id', loadChildren: './server/server-status/server-status.module#ServerStatusModule', canActivate: [AuthGuard] },
            { path: 'logs/:id', loadChildren: './server/log-list/log-list.module#LogListModule', canActivate: [AuthGuard] },
            { path: 'reservations', loadChildren: './reservation/reservation.module#ReservationModule', canActivate: [AuthGuard] },
            { path: 'calendar', loadChildren: './reservation/calendar/reservation-calendar.module#ReservationCalendarModule', canActivate: [AuthGuard]},
            { path: 'administration/users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
            { path: 'administration/customers', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
            { path: 'administration/log', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
            { path: 'settings/bitstream-status', loadChildren: './settings/bitstream-status/bitstream-status.module#BitstreamStatusModule', canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
