import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, BroadcasterService} from '../../../shared/services';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnotifyService} from 'ng-snotify';

@Component({
    selector: 'app-server-power-config',
    templateUrl: './server-power-config.component.html',
    styleUrls: ['./server-power-config.component.scss']
})
export class ServerPowerConfigComponent implements OnInit, OnDestroy {
    module: string;

    form: FormGroup;
    errorMessage: any;

    serverId: number;

    bitstreamList = [];

    bitstreamSelectSettings = {};

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected modalService: BsModalService,
                protected authService: AuthService,
                protected router: Router,
                protected broadcaster: BroadcasterService,
                private snotifyService: SnotifyService) {
    }

    ngOnInit() {
        // set each select field config
        this.bitstreamSelectSettings = {
            singleSelection: true,
            text: '(Select Bitstream)',
        };

    }

    ngOnDestroy() {
        this.form = null;
    }

    init(selectListData, serverId) {
        this.serverId = serverId;

        if (selectListData) {
            this.bitstreamList = selectListData.board_config_list;
        }

        this.form = this.fb.group({
            'bitstream': ['', [Validators.required]],
            }, {
                updateOn: 'blur',
                validateEvent: 'blur',
            }
        );

        this.errorMessage = null;
    }

    submit() {
        this.authService.powerOnConfig(this.serverId, this.form.value.bitstream)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {
                        this.modalService.hide(1);
                    }

                    this.snotifyService.success('Power On configuration successfully updated.');
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }
}
