import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { routerTransition } from '../../../router.animations';
import { BsModalRef } from 'ngx-bootstrap';
import { LogTypes } from '../../../models/logTypes';

@Component({
    selector: 'app-log-list',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.scss'],
    animations: [routerTransition()]
})

export class LogListComponent implements OnInit, OnDestroy {

    logTypes: typeof LogTypes = LogTypes;
    bsModalRef: BsModalRef;
    sub: Subscription;
    serverId: number;
    error: string;
    ready = false;
    empty = false;
    page = 1;

    constructor(private route: ActivatedRoute) {
        this.sub = this.route.params.subscribe(params => {
            this.serverId = +params['id'];
        });
    }

    ngOnInit() {
        this.ready = false;
        this.empty = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
