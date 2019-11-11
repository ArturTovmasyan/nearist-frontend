import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../shared';
import { ManageComponent } from './manage/manage.component';
import { ServerFormTypes } from './server-model-form';
import { Subscription } from 'rxjs/Subscription';
import { routerTransition } from '../../router.animations';
import { BroadcasterService } from '../../shared';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss'],
    animations: [routerTransition()]
})
export class ServerComponent implements OnInit, OnDestroy {

    servers: any = null;
    error: string;
    bsModalRef: BsModalRef;
    ready = false;
    currentServerId: any = null;
    removeServerId: any;
    subscription: any;
    routeSubsc: Subscription;
    empty = false;

    constructor(private authService: AuthService,
                private modalService: BsModalService,
                private router: Router,
                private broadcaster: BroadcasterService) {
        this.ready = false;
        this.empty = false;
        this.currentServerId = localStorage.getItem('sid');

        /**
         * Use Subject service for communication with profile component
         */
        this.subscription = this.broadcaster.on('closeModal');
        this.subscription.subscribe(
            (data) => {
                this.closeModal();
                if (data === true) {
                    this.getServerList();
                }
            });

        this.routeSubsc = router.events.subscribe(event => {

            if (event instanceof NavigationEnd) {
                this.getServerList();
            }
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.routeSubsc.unsubscribe();
    }

    getServerList() {

        this.authService.getServerList()
            .subscribe(
                res => {
                    if (res.data) {
                        this.servers = res.data.server;

                        if (this.servers.length > 0) {
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

    removeServer(id: number) {

        if (id) {
            this.authService.removeServer(id)
                .subscribe(
                    () => {
                        this.getServerList();
                    },
                    error => {
                        this.error = 'Cant';
                        console.error(error);
                    }
                );
        }
    }

    editServer(id: number) {
        this.authService.getServerById(id)
            .subscribe(
                res => {
                    this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
                    this.bsModalRef.content.init(res.data.server, ServerFormTypes.edit);
                },
                error => {
                    console.error(error);
                }
            );
    }

    serverData(id: any, serverName: string) {
        localStorage.setItem('serverName', serverName);
        this.router.navigate(['/admin/dashboard', id]);
    }

    openModal() {
        this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
        this.bsModalRef.content.init({}, ServerFormTypes.add);
    }

    closeModal() {
        this.modalService.hide(1);
    }

    openConfirmModal(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.removeServerId = id;
        }
    }

    confirm(): void {
        this.bsModalRef.hide();
        this.removeServer(this.removeServerId);
    }

    decline(): void {
        this.bsModalRef.hide();
    }
}
