import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {AuthService} from '../../../shared/index';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ManageComponent} from './manage/manage.component';
import {BroadcasterService} from '../../../shared/index';
import {FormTypes} from './bitstream-status-model-form';

@Component({
    selector: 'app-bitstream-status',
    templateUrl: './bitstream-status.component.html',
    styleUrls: ['./bitstream-status.component.scss'],
    animations: [routerTransition()]
})

export class BitstreamStatusComponent implements OnInit, OnDestroy {
    bsModalRef: BsModalRef;
    subscription: any;

    error: any;
    ready = false;
    empty = false;

    list: any;
    removeId: number;

    constructor(private authService: AuthService,
                private modalService: BsModalService,
                private broadcaster: BroadcasterService) {

        this.subscription = this.broadcaster.on('closeModal');
        this.subscription.subscribe(
            (data) => {
                this.closeModal();
                if (data === true) {
                    this.getList();
                }
            });
    }

    ngOnInit() {
        this.getList();
        this.ready = false;
        this.empty = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getList() {
        this.authService.getBitstreamStatusList().subscribe(
            res => {
                if (res.status && res.status === 200) {
                    this.list = res.data;

                    if (this.list && this.list.length > 0) {
                        this.ready = true;
                    } else {
                        this.empty = true;
                    }
                }
            },
            error => {
                console.error(error);
            }
        );
    }

    openModalAdd() {
        this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
        this.bsModalRef.content.init({}, FormTypes.add);
    }

    openModalAddEdit(id: number) {
        this.authService.getBitstreamStatus(id).subscribe(
            res => {
                this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
                this.bsModalRef.content.init(res.data, FormTypes.edit);
            },
            error => {
                console.error(error);
            }
        );
    }

    openModalRemove(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.removeId = +id;
        }
    }

    remove(id) {
        if (id) {
            this.authService.removeBitstreamStatus(id).subscribe(
                res => {
                    this.getList();
                },
                error => {
                    this.error = 'Cant';
                    console.error(error);
                }
            );
        }
    }

    confirmRemove(): void {
        this.bsModalRef.hide();
        this.remove(this.removeId);
    }

    declineRemove(): void {
        this.bsModalRef.hide();
    }

    closeModal() {
        this.modalService.hide(1);
    }

}
