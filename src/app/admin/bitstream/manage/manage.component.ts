import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared';
import { BsModalRef } from 'ngx-bootstrap';
import { BroadcasterService } from '../../../shared';
import { Router } from '@angular/router';
import { BitstreamModelForm, BitstreamFormTypes } from '../bitstream-model-form';
import { BoardTypes } from '../../../models/boardTypes';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends BitstreamModelForm implements OnInit, OnDestroy {

    boardConfigs: any;
    bitStreams: any;
    errorMessage: any;
    deviceList = [];

    boardTypeList = [];
    selectedBoardType = [];
    dropdownBoardTypeSettings = {};

    statusList = [];
    selectedStatus = [];
    dropdownStatusSettings = {};

    editId: number;
    filesValid = false;
    uploadedFilesCount = 0;
    countFilesType = 0;
    deviceTypeKeys = [];
    formTitle: string;
    alertShow = false;
    showFields = false;
    config = [];
    uploadedFiles: any = {};
    items: any[] = [];

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router,
                private broadcaster: BroadcasterService) {
        super(fb, bsModalRef, authService, router);
    }

    ngOnInit() {
        this.countFilesType = +localStorage.getItem('file_count');
        this.boardTypeList = [
            {'id': 1, 'itemName': BoardTypes[1]},
            {'id': 2, 'itemName': BoardTypes[2]}
        ];

        this.dropdownBoardTypeSettings = {
            singleSelection: true,
            text: 'Select Board Type',
        };

        this.dropdownStatusSettings = {
            singleSelection: true,
            text: 'Select Status Type',
        };
    }

    ngOnDestroy() {
        this.form = null;
    }

    onFileChange(event, dType: number, fType: number, streamId?: number) {

        if (event.target.files && event.target.files.length > 0) {

            let size = event.target.files[0].size;
            size = size / 1024 / 1024; // convert to MB

            if (size < 100) { // 1000 MB

                const reader = new FileReader();
                const file = event.target.files[0];

                const key = dType + fType;
                reader.readAsDataURL(file);

                reader.onload = () => {

                    const fileString = reader.result.split(',')[1];
                    const fileName = file.name;

                    const fileData = {
                        file_name: fileName,
                        value: fileString,
                        file_type: +fType,
                        device_type: +dType,
                        stream_id: +streamId
                    };

                    this.uploadedFiles[key] = fileData;

                    if (Object.keys(this.uploadedFiles).length === this.countFilesType) {
                        this.filesValid = true;
                    }
                };
            } else {
                this.alertShow = true;

                setTimeout(() => {
                    this.alertShow = false;
                }, 4000);
            }
        }
    }

    init(boardconfigs: any, type: BitstreamFormTypes = BitstreamFormTypes.add) {

        this.errorMessage = null;
        this.boardConfigs = boardconfigs;
        this.type = type;

        if (this.boardConfigs) {
            this.editId = this.boardConfigs.id;
            this.selectedBoardType = this.boardConfigs.board_type;
            this.selectedStatus = this.boardConfigs.status;
            this.bitStreams = this.boardConfigs.bitstreams;
        }

        this.authService.getBitstreamStatusList().subscribe(
            res => {
                if (res.data && res.data.length > 0) {
                    for (let i = 0; i < res.data.length; i++) {
                        let o = res.data[i];
                        o.itemName = o.title;
                        delete o.title;
                    }
                }
                this.statusList = res.data;
            },
            error => {
                console.error(error);
            }
        );

        this.initBitStreamForm();

        switch (this.type) {
            case BitstreamFormTypes.add:
                this.initAddBitstreamFields();
                break;
            case BitstreamFormTypes.edit:
                this.initEditBitstreamFields();
                break;
        }
    }

    initAddBitstreamFields() {
        this.formTitle = 'Add Bitstream';
    }

    initEditBitstreamFields() {
        this.formTitle = 'Edit Bitstream';
        this.filesValid = true;
    }

    addBitstream() {

        if (Object.keys(this.uploadedFiles).length === this.countFilesType) {

            this.form.value.fileData = this.uploadedFiles;
            this.authService.addBitStream(this.form.value)
                .subscribe(
                    res => {
                        this.errorMessage = null;

                        if (res.status && res.status === 200) {
                            this.broadcaster.broadcast('closeModal', true);
                        }
                    },
                    error => {
                        this.errorMessage = error.error.data.errors;
                    }
                );
        }
    }

    editBitstream() {

        this.form.value.fileData = this.uploadedFiles;
        this.authService.editBitStream(this.editId, this.form.value)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {
                        this.broadcaster.broadcast('closeModal', true);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }

    onBitstreamTypeChange(event) {

        const boardConfig = JSON.parse(localStorage.getItem('board_config'));

        if (event) {
            const selectedValue = event[0].id;
            this.uploadedFilesCount = boardConfig[selectedValue][1].length;

            switch (selectedValue) {
                case 1: {
                    this.deviceList = boardConfig[selectedValue];
                    this.deviceTypeKeys = Object.keys(this.deviceList);
                    break;
                }
                case 2: {

                    this.deviceList = boardConfig[selectedValue];
                    this.deviceTypeKeys = Object.keys(this.deviceList);
                    break;
                }
                default: {
                    break;
                }
            }

            this.showFields = true;
        }
    }
}
