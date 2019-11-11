import {Component, OnDestroy, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService, BroadcasterService} from '../../../shared';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LogTypes} from '../../../models/logTypes';
import {ServerLoadBitstreamComponent} from '../server-load-bitstream/server-load-bitstream.component';
import {ServerPowerConfigComponent} from '../server-power-config/server-power-config.component';

@Component({
    selector: 'app-server-dashboard',
    templateUrl: './server-dashboard.component.html',
    styleUrls: ['./server-dashboard.component.scss'],
    animations: [routerTransition()]
})

export class ServerDashboardComponent implements OnInit, OnDestroy {
    sub: Subscription;
    bsModalRef: BsModalRef;
    logTypes: typeof LogTypes = LogTypes;

    serverId: any;
    ramUsed: any;
    ramTotal: any;
    ramFree: any;
    error: any;
    serverData: any;
    ready = false;

    chartType = 'pie';

    power = {
        show: false,
        ready: false,
        error: '',
        status: '',
        statusClass: 'text-danger',
    };

    bitstream = {
        show: false,
        ready: false,
        error: '',
        boardCount: 0,
    };

    public memoryLabel: string[] = [
        'Used (GB)',
        'Total (GB)'
    ];

    public cpuLabel: string[] = [
        'Used (%)',
        'Total (%)'
    ];

    public diskLabel: string[] = [
        'Used (GB)',
        'Total (GB)'
    ];

    public memoryData: number[] = [];
    public cpuData: number[] = [];
    public diskData: number[] = [];

    public chartOptions: any = {
        maintainAspectRatio: false,
        width: 500,
        height: 500,
    };

    constructor(protected route: ActivatedRoute,
                protected authService: AuthService,
                protected modalService: BsModalService,
                protected broadcaster: BroadcasterService) {
        this.sub = this.route.params.subscribe(params => {
            this.serverId = +params['id'];
        });
    }

    ngOnInit() {
        this.ready = false;

        if (this.serverId) {
            this.powerGetStatus();
            // this.getServerData();
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getServerData() {
        if (this.power.status.toLowerCase() === 'on') {
            this.authService.getServerStatus(this.serverId).subscribe(
                res => {
                    if (res.status && res.status === 200) {

                        this.serverData = res.data;

                        if (this.serverData) {

                            const serverRam = this.serverData.RAM;
                            this.ready = true;

                            this.ramFree = +serverRam.free;
                            this.ramTotal = +serverRam.total;
                            this.ramUsed = +this.ramTotal - (+this.ramFree);

                            const totalRamData = +this.authService.fileSize(this.ramTotal);
                            const usedRamData = +this.authService.fileSize(this.ramUsed);
                            this.memoryData = [usedRamData, totalRamData];

                            const cpuUsage = +this.serverData.cpuUsage;
                            this.cpuData = [cpuUsage, 100];

                            const hdData = this.serverData.HD;
                            let diskFreeSum = 0;
                            let diskSum = 0;

                            for (const hd of hdData) {
                                diskFreeSum += hd.free;
                                diskSum += hd.size;
                            }

                            let diskUsedSpace = diskSum - diskFreeSum;
                            const diskSpace = +this.authService.fileSize(diskSum);
                            diskUsedSpace = +this.authService.fileSize(diskUsedSpace);

                            this.diskData = [diskUsedSpace, diskSpace];

                            this.bitstreamGetStatus();
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

    /** Bitstream Management **/
    bitstreamGetStatus() {
        this.authService.getServerInfoById(this.serverId).subscribe(
            res => {
                if (res.status && res.status === 200) {
                    this.bitstream.boardCount = res.data.board_list.length;
                    this.bitstream.ready = true;
                }
                this.bitstream.show = true;
            },
            error => {
                const customError = error.error;
                if (customError && customError.status && customError.status === 400) {
                    this.bitstream.error = customError.message;
                }
                this.bitstream.show = true;
            }
        );
    }

    bitstreamOpenModal() {
        this.authService.getServerInfoById(this.serverId).subscribe(
            res => {
                this.bsModalRef = this.modalService.show(ServerLoadBitstreamComponent, {ignoreBackdropClick: true});
                this.bsModalRef.content.init(res.data, this.serverId);
            },
            error => {
                console.error(error);
            }
        );
    }

    powerOpenModal() {
        this.authService.getServerInfoById(this.serverId).subscribe(
            res => {
                this.bsModalRef = this.modalService.show(ServerPowerConfigComponent, {ignoreBackdropClick: true});
                this.bsModalRef.content.init(res.data, this.serverId);
            },
            error => {
                console.error(error);
            }
        );
    }

    /** IPMI Management **/
    powerGetStatus() {
        this.authService.getServerPowerStatus(this.serverId).subscribe(
            res => {
                if (res.status && res.status === 200) {
                    this.power.status = res.data;
                    this.power.ready = true;

                    if (this.power.status.toLowerCase() === 'on') {
                        this.power.statusClass = 'text-success';

                        this.getServerData();
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

    powerOn() {
        this.manageServerPower(1);
    }

    powerOff() {
        this.manageServerPower(0);
    }

    manageServerPower(status) {
        this.authService.manageServerPower(this.serverId, status).subscribe(res => {
                if (res.status && res.status === 200) {
                    this.powerGetStatus();
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

}
