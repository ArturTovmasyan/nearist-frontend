import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {AuthService, BroadcasterService} from '../../shared';
import {User} from '../../models/user';
import {BsModalService} from 'ngx-bootstrap';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs/Subscription';
import {NavigationEnd, Router} from '@angular/router';
import {UserFormTypes} from './user-model-form';
import {ManageComponent} from './manage/manage.component';
import {SnotifyService} from 'ng-snotify';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit, OnDestroy {

    users: User[];
    error: string;
    urlLink: string;
    userCategory = 2;
    id: number;
    removeUserId: number;
    resetUserId: number;
    tableTitle = 'Users';
    bsModalRef: BsModalRef;
    subscription: any;
    routeSubs: Subscription;
    currentUserId: any = null;
    ready = false;
    empty = false;

    log = false;

    constructor(private authService: AuthService,
                private modalService: BsModalService,
                private router: Router,
                private broadcaster: BroadcasterService,
                private snotifyService: SnotifyService) {

        this.ready = false;
        this.empty = false;
        this.currentUserId = localStorage.getItem('uid');

        this.urlLink = this.router.url;
        if (this.urlLink === '/admin/administration/customers') {
            this.userCategory = 1;
            this.tableTitle = 'Customers';
        }

        if (this.urlLink === '/admin/administration/log') {
            this.log = true;
            this.tableTitle = 'Authorization log';
        }

        /**
         * Use Subject service for communication with profile component
         */
        this.subscription = this.broadcaster.on('closeModal');
        this.subscription.subscribe(
            () => {
                this.closeModal();

                if (!this.log) {
                    this.getUserList(this.userCategory);
                }
            });

        this.routeSubs = router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.closeModal();
                if (!this.log) {
                    this.getUserList(this.userCategory);
                }
            }
        });
    }

    ngOnInit() {
        this.removeUserId = null;
        this.resetUserId = null;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.routeSubs.unsubscribe();
    }

    getUserList(type: number) {

        this.authService.getUserList(type)
            .subscribe(
                res => {
                    if (res.data) {
                        this.users = res.data.users;

                        if (this.users.length > 0) {
                            this.ready = true;
                        } else {
                            this.empty = true;
                        }
                    }
                },
                error => {
                    this.error = 'Cant';
                    console.error(error);
                }
            );
    }

    removeUser(id: number, category: number) {

        if (id) {
            this.authService.removeUser(id)
                .subscribe(
                    () => {
                        this.getUserList(category);
                    },
                    error => {
                        this.error = 'Cant';
                        console.error(error);
                    }
                );
        }
    }

    editUser(id: number) {
        this.authService.getUserById(id)
            .subscribe(
                res => {
                    this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
                    this.bsModalRef.content.init(res.data.user, UserFormTypes.edit, this.userCategory);
                },
                error => {
                    console.error(error);
                }
            );
    }

    openModal() {
        this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
        this.bsModalRef.content.init({}, UserFormTypes.add, this.userCategory);
    }

    closeModal() {
        this.modalService.hide(1);
    }

    openConfirmModal(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.removeUserId = id;
        }
    }

    syncConfirmModal(template: TemplateRef<any>) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

    }

    resetConfirmModal(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.resetUserId = id;
        }
    }

    confirmDelete(): void {
        this.bsModalRef.hide();
        this.removeUser(this.removeUserId, this.userCategory);
    }

    confirmSync(): void {
        this.bsModalRef.hide();
        this.authService.syncFtpUsers(this.userCategory).subscribe(
            () => {
                this.snotifyService.success('All servers has been syncronized!');
                this.getUserList(this.userCategory);
            },
            error => {
                this.error = 'Cant';
                console.error(error);
            }
        );
    }

    confirmReset(): void {
        this.bsModalRef.hide();
        this.authService.resetUserPassword(this.resetUserId).subscribe(
            () => {
                this.snotifyService.success('User password has been reset!');
                this.getUserList(this.userCategory);
            },
            error => {
                // TODO: add snackbar notification
                this.error = 'Cant';
                console.error(error);
            }
        );
    }

    decline(): void {
        this.bsModalRef.hide();
    }
}
