import { Component, OnDestroy, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AuthService } from '../../../shared';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-server-status',
    templateUrl: './server-status.component.html',
    styleUrls: ['./server-status.component.scss'],
    animations: [routerTransition()]
})

export class ServerStatusComponent implements OnInit, OnDestroy {
    serverData: any;
    error: any;
    ready = false;
    notSupported = 'Not supported';
    servicesKeys: any;
    networkDeviceKeys: any;
    sub: Subscription;

    ramTotal: number;
    ramUsed: number;
    ramFree: number;
    swapTotal: any;
    swapUsed: number;
    swapFree: number;
    serverId: number;
    serverName = '';

    constructor(private authService: AuthService,
                private route: ActivatedRoute) {
        this.ready = false;
        this.serverName = localStorage.getItem('serverName');

        this.sub = this.route.params.subscribe(params => {
            this.serverId = +params['id'];
        });
    }

    ngOnInit() {
        if (this.serverId) {
            this.getServerData(this.serverId);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        localStorage.removeItem('serverName');
    }

    getServerData(id: number) {

        this.authService.getServerStatus(id).subscribe(res => {

                if (res.status && res.status === 200) {

                    this.serverData = res.data;

                    if (this.serverData) {

                        this.ready = true;

                        const services = this.serverData.services;
                        const networkDevices = this.serverData['Network Devices'];
                        const serverRam = this.serverData.RAM;

                        this.ramFree = +serverRam.free;
                        this.ramTotal = +serverRam.total;
                        this.ramUsed = +this.ramTotal - (+this.ramFree);

                        this.swapFree = +serverRam.swapFree;
                        this.swapTotal = +serverRam.swapTotal;
                        this.swapUsed = +this.swapTotal - (+this.swapFree);

                        this.swapFree = +serverRam.swapFree;
                        this.swapTotal = +serverRam.swapTotal;
                        this.swapUsed = +this.swapTotal - (+this.swapFree);

                        this.servicesKeys = Object.keys(services);
                        this.networkDeviceKeys = Object.keys(networkDevices);
                    }
                }
            },
            error => {

                const customError = error.error;

                if (customError.status && customError.status === 400) {
                    this.error = customError.message;
                }
            }
        );
    }
}
