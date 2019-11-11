import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from "rxjs/Subscription";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { AuthService } from "../../../shared";
import { ChangePasswordComponent } from "../../users/change-password/change-password.component";
import { BroadcasterService } from '../../../shared/services';
import { UserFormTypes } from '../../users/user-model-form';
import { ManageComponent } from '../../users/manage/manage.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    pushRightClass: string = 'push-right';
    fullName: any;
    subscribeRoute: Subscription;
    subscription: any;
    bsModalRef: BsModalRef;
    currentUserId: number;
    errorMessage: any;
    user: any;

    constructor
    (
        private translate: TranslateService,
        public router: Router,
        private modalService: BsModalService,
        private authService: AuthService,
        private broadcaster: BroadcasterService,
    ) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.subscribeRoute = this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.fullName = localStorage.getItem('fullName');

        /**
         * Use Subject service for communication with profile component
         */
        this.subscription = this.broadcaster.on( 'user');
        this.subscription.subscribe(
            data => {
                this.user = data;
                this.fullName = data.first_name + ' ' + data.last_name;
            });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscribeRoute.unsubscribe();
        this.subscription.unsubscribe();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    openSetting() {
        this.bsModalRef = this.modalService.show(ChangePasswordComponent, {});
    }

    openProfile() {

        if (this.user && this.user.id) {
            this.bsModalRef = this.modalService.show(ManageComponent, {});
            this.bsModalRef.content.init(this.user, UserFormTypes.profile);
        } else {
            this.currentUserId = +localStorage.getItem('uid');
            this.authService.getUserById(this.currentUserId)
                .subscribe(
                    res => {
                        this.bsModalRef = this.modalService.show(ManageComponent, {});
                        this.bsModalRef.content.init(res.data.user, UserFormTypes.profile);
                    },
                    error => {console.error(error)}
                );
        }
    }
}
