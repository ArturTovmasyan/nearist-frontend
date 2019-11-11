import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, BroadcasterService} from '../../../shared/services';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../shared';
import {SnotifyService} from 'ng-snotify';

@Component({
    selector: 'app-server-load-bitstream',
    templateUrl: './server-load-bitstream.component.html',
    styleUrls: ['./server-load-bitstream.component.scss']
})
export class ServerLoadBitstreamComponent implements OnInit, OnDestroy {
    module: string;

    form: FormGroup;
    errorMessage: any;

    serverId: number;

    boardConfigurationList = [];
    boardList = [];
    laneList = [];

    selectedBoardConfiguration = [];
    boardConfigurationSelectSettings = {};

    boardDetailChecked = false;
    submitData = [];

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
        this.boardConfigurationSelectSettings = {
            singleSelection: true,
            text: 'Select Board Configuration',
        };

    }

    ngOnDestroy() {
        this.form = null;
    }

    init(selectListData, serverId) {
        this.serverId = serverId;

        if (selectListData) {
            this.boardConfigurationList = selectListData.board_config_list;
            this.boardList = selectListData.board_list;
            this.laneList = selectListData.lane_list;
        }

        this.form = this.fb.group({
                'boardConfiguration': ['', [Validators.required]],
            }, {
                updateOn: 'blur',
                validateEvent: 'blur',
                validator: ValidationService.reservationDatesValidator
            }
        );

        this.errorMessage = null;
    }

    submitBitstream() {
        if (this.submitData.length > 0) {
            this.form.value.board_data = this.submitData;
            this.authService.loadBitstream(this.serverId, this.form.value)
                .subscribe(
                    res => {
                        this.errorMessage = null;

                        if (res.status && res.status === 200) {
                            this.modalService.hide(1);
                        }

                        this.snotifyService.success('Bitstream(s) successfully loaded.');
                    },
                    error => {
                        this.errorMessage = error.error.data.errors;
                    }
                );
        }

    }
}
