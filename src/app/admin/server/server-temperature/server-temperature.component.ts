import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { AuthService } from '../../../shared';
import { Router } from '@angular/router';
import { BroadcasterService } from '../../../shared';
import { ValidationService } from '../../../shared';

@Component({
    selector: 'app-server-temperature',
    templateUrl: './server-temperature.component.html',
    styleUrls: ['./server-temperature.component.scss']
})

export class ServerTemperatureComponent implements OnInit {

    form: FormGroup;
    server: any;
    errorMessage: any;
    serverId: number;

    constructor(protected fb: FormBuilder,
                public bsModalRef: BsModalRef,
                protected authService: AuthService,
                protected router: Router,
                private broadcaster: BroadcasterService) {
    }

    ngOnInit() {}

    init(serverMonitoring: any, id: number) {

        this.serverId = id;
        this.server = serverMonitoring;

        this.form = this.fb.group({
                'log_rate': [this.server ? this.server.log_rate : '', [Validators.required]],
                'event_temperature': [this.server ? this.server.event_temperature : '', [Validators.required]],
                'event_duration': [this.server ? this.server.event_duration : '', [Validators.required]],
                'emails': [this.server ? this.server.emails : '', [Validators.required, ValidationService.emailValidator]],
            }
        );
    }

    saveData(id, data) {

        this.authService.manageServerTemperature(+id, data)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200) {
                        this.broadcaster.broadcast('updateList', false);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );
    }
}
