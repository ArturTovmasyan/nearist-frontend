import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared";
import {routerTransition} from "../../router.animations";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss'],
    animations: [routerTransition()]
})
export class ServerComponent implements OnInit {
    error: any;
    servers: any = null;
    hasServers: boolean;
    power = {
        show: false,
        ready: false,
        error: '',
        status: '',
        statusClass: 'text-danger'
    };

    constructor(
        protected authService: AuthService
    ) {
        this.getServersData();
    }

    ngOnInit() {

    }

    /**
     * Get customer related servers
     */
    getServersData() {
        this.authService.getCustomerServers().subscribe(
            res => {
                if (res.status && res.status === 200) {
                    this.servers = res.data.server;

                    if (this.servers.length > 0) {
                        this.hasServers = true;

                        for (let i = 0; i < this.servers.length; i++) {
                            var startDate = new Date(this.servers[i].startDate);
                            var endDate   = new Date(this.servers[i].endDate);
                            var today     = new Date();

                            if ((startDate.getTime() > today.getTime()) || (endDate.getTime() < today.getTime())) {
                                this.servers[i].dateRestriction        = true;
                                this.servers[i].dateRestrictionMessage = 'Your haven\'t  access to server at this time';
                            } else {
                                this.servers[i].dateRestriction        = false;
                                this.servers[i].dateRestrictionMessage = '';
                            }

                            this.powerGetStatus(this.servers[i].id);
                        }
                    } else {
                        this.hasServers = false;
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

    powerOn(serverId) {
        this.manageServerPower(serverId, 1);
    }

    powerOff(serverId) {
        this.manageServerPower(serverId, 0);
    }

    manageServerPower(serverId, status) {
        this.authService.manageServerPower(serverId, status).subscribe(res => {
                if (res.status && res.status === 200) {
                    this.powerGetStatus(serverId);
                }
            },
            error => {
                const customError = error.error;
                if (customError.status && customError.status === 400) {
                    this.power.error = customError.message;
                }
            }
        );
    }

    powerGetStatus(serverId) {
        this.authService.getServerPowerStatus(serverId).subscribe(
            res => {
                if (res.status && res.status === 200) {
                    this.power.status = res.data;
                    this.power.ready = true;

                    if (this.power.status.toLowerCase() === 'on') {
                        this.power.statusClass = 'text-success';
                    }
                }

                this.power.show = true;
            },
            error => {
                const customError = error.error;

                if (customError.status && customError.status === 400) {
                    this.power.error = customError.message;
                }

                this.power.show = true;
            }
        );
    }
}
