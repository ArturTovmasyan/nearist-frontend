import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {Broadcaster} from './shared/tools/broadcaster';
import {AuthService} from './shared';
import {ValidationService, BroadcasterService} from './shared';

import {NgHttpLoaderModule} from 'ng-http-loader';
import {NgIdleModule} from '@ng-idle/core';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function toastSettings() {
    const options = ToastDefaults;
    options.toast.iconClass = 'hidden';
    return options;
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SnotifyModule,
        BrowserAnimationsModule,
        NgHttpLoaderModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        NgIdleModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthGuard,
        Broadcaster,
        AuthService,
        ValidationService,
        BroadcasterService,
        {provide: 'SnotifyToastConfig', useValue: toastSettings()},
        SnotifyService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
