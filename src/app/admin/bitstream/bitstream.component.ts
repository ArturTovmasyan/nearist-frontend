import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthService } from '../../shared';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ManageComponent } from './manage/manage.component';
import { BroadcasterService } from '../../shared';
import { BitstreamFormTypes } from './bitstream-model-form';

@Component({
    selector: 'app-bitstream',
    templateUrl: './bitstream.component.html',
    styleUrls: ['./bitstream.component.scss'],
    animations: [routerTransition()]
})

export class BitstreamComponent implements OnInit, OnDestroy {

    ready = false;
    empty = false;
    bitstreams: any;
    bsModalRef: BsModalRef;
    subscription: any;
    removeId: number;
    error: any;

    constructor(private authService: AuthService,
                private modalService: BsModalService,
                private broadcaster: BroadcasterService) {

        this.subscription = this.broadcaster.on('closeModal');
        this.subscription.subscribe(
            (data) => {
                this.closeModal();
                if (data === true) {
                    this.getBitStreamList();
                }
            });
    }

    ngOnInit() {
        this.getBitStreamList();
        this.ready = false;
        this.empty = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    removeBitStream(id) {
        if (id) {
            this.authService.removeBitStream(id)
                .subscribe(
                    res => {
                        this.getBitStreamList();
                    },
                    error => {
                        this.error = 'Cant';
                        console.error(error);
                    }
                );
        }
    }

    downloadFile(id: number, fileName: string) {
        this.authService.downloadFile(id)
            .subscribe(
                res => {
                    const options = {type: 'application/octet-stream; charset=utf-8;'};
                    this.authService.createAndDownloadBlobFile(res, options, fileName);
                },
                error => {
                    console.error(error);
                }
            );
    }

    getBitStreamList() {

        this.authService.getBitStreams()
            .subscribe(
                res => {

                    if (res.status && res.status === 200) {

                        this.bitstreams = res.data.list;

                        localStorage.setItem('board_config', JSON.stringify(res.data.config));
                        localStorage.setItem('file_count', res.data.fileCount);

                        if (this.bitstreams && this.bitstreams.length > 0) {
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

    openModal() {
        this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
        this.bsModalRef.content.init({}, BitstreamFormTypes.add);
    }

    closeModal() {
        this.modalService.hide(1);
    }

    openConfirmModal(template: TemplateRef<any>, id?: number) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});

        if (id) {
            this.removeId = +id;
        }
    }

    editBitStream(id: number) {
        this.authService.getBitStreamById(id)
            .subscribe(
                res => {
                    this.bsModalRef = this.modalService.show(ManageComponent, {ignoreBackdropClick: true});
                    this.bsModalRef.content.init(res.data, BitstreamFormTypes.edit);
                },
                error => {
                    console.error(error);
                }
            );
    }

    confirm(): void {
        this.bsModalRef.hide();
        this.removeBitStream(this.removeId);
    }

    decline(): void {
        this.bsModalRef.hide();
    }
}
