import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared';

const routes: Routes = [
    {path: '', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    {path: 'logout', loadChildren: './logout/logout.module#LogoutModule'},
    {path: 'signup', loadChildren: './signup/signup.module#SignupModule'},
    {path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'},
    {path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordModule'},
    {path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule'},
    {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
