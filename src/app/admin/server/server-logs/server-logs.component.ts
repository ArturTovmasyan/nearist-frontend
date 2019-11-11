import { Component, OnInit, Input, OnDestroy, TemplateRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AuthService } from '../../../shared';
import { ServerTemperatureComponent } from '../server-temperature/server-temperature.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BroadcasterService } from '../../../shared';
import { LogTypes } from '../../../models/logTypes';
import { DateFilterTypes } from '../../../models/dateFilterTypes';

@Component({
    selector: 'app-server-logs',
    templateUrl: './server-logs.component.html',
    styleUrls: ['./server-logs.component.scss'],
    animations: [routerTransition()]
})

export class ServerLogsComponent implements OnInit, OnDestroy {
    @Input() serverId: number;
    @Input() type: number;
    @Input() isList: boolean;
    @Input() onlyTable: boolean;
    @Input() class: boolean;

    dateFilterTypes: typeof DateFilterTypes = DateFilterTypes;
    logTypes: typeof LogTypes = LogTypes;
    dateFilter = this.dateFilterTypes.day;
    chartTimeLineFilter = 'day';
    paginationTotalItem: number;
    bsModalRef: BsModalRef;
    chartDateTimes = [];
    logsDataForChart = [];
    chartTitle: string;
    variableName: string;
    chartOptions: any;
    chartLabels: any;
    subscription: any;
    tempReady = false;
    temp: any = null;
    tableTab = true;
    dataList: any;
    logTitle: string;
    empty = false;
    chartData: any;
    page = 1;
    limit = 10;
    ready = false;

    constructor(protected authService: AuthService,
                protected modalService: BsModalService,
                protected broadcaster: BroadcasterService
    ) {
        this.subscription = this.broadcaster.on('updateList');
        this.subscription.subscribe(
            () => {
                if (this.type === this.logTypes.TEMPERATURE) {
                    this.loadTemperatureLogs(this.page);
                }
            });
    }

    ngOnInit() {
        this.getLogData(this.page);
        this.empty = false;
        this.ready = false;

        // init titles for log list and chart
        if (this.type === this.logTypes.TEMPERATURE) {
            this.logTitle = 'Temperature Logs';
            this.chartTitle = 'Temperature °C';
            this.variableName = 'temperature';
        } else if (this.type === this.logTypes.MEMORY) {
            this.logTitle = 'Memory Logs';
            this.chartTitle = 'Memory';
            this.variableName = 'MEMORY';
        } else if (this.type === this.logTypes.CPU) {
            this.logTitle = 'CPU Logs';
            this.chartTitle = 'CPU %';
            this.variableName = 'CPU';
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openRemoveConfirmModal(template: TemplateRef<any>) {
        this.bsModalRef = this.modalService.show(template, {class: 'modal-md', ignoreBackdropClick: true});
    }

    initChartData(logData: any) {

        this.tableTab = true;
        this.chartDateTimes = [];
        this.logsDataForChart = [];

        logData.forEach(function (value) {
            this.chartDateTimes.push(value.date_time);
            this.logsDataForChart.push(value[this.variableName]);
        }, this);

        this.chartDateTimes.reverse();
        this.logsDataForChart.reverse();

        this.chartLabels = this.chartDateTimes;

        this.chartOptions = {
            responsive: true,
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            'second': 'DD/MM HH:mm',
                            'minute': 'HH:mm',
                            'hour': 'DD/MM HH:mm',
                            'day': 'DD/MM HH:mm',
                            'week': 'DD/MM HH:mm',
                            'month': 'DD/MM HH:mm',
                            'year': 'DD/MM HH:mm'
                        }
                    }
                }]
            }
        };

        this.chartData = [
            {
                data: this.logsDataForChart,
                label: this.chartTitle
            },
        ];
    }

    loadTemperatureLogs(page: number) {
        this.authService.getServerTempLogsByServerId(this.serverId, page, this.limit)
            .subscribe(
                res => {
                    if (res.data) {
                        this.dataList            = res.data.list;
                        this.paginationTotalItem = res.data.pagination.count;

                        if (this.dataList.length > 0) {
                            this.ready = true;
                            this.tempReady = true;
                        } else {
                            this.empty = true;
                            this.tempReady = false;
                        }
                    } else {
                        this.empty = true;
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

    /*loadTemperatureLogs(page: number) {
        this.authService.getServerTempLogsByServerId(this.serverId)
            .subscribe(
                res => {

                    if (res.data && res.data.event_temperature) {
                        this.temp = res.data.event_temperature;
                    } else {
                        this.empty = true;
                    }

                    if (!this.temp) {
                        this.temp = 0;
                    }

                    this.authService.getServerLogs(this.serverId, page, this.type, this.dateFilter, this.temp)
                        .subscribe(
                            logs => {

                                if (logs.data) {
                                    this.page = page;
                                    this.dataList = logs.data.logs_data;
                                    this.paginationTotalItem = +logs.data.count;
                                    this.initChartData(this.dataList);
                                } else {
                                    this.dataList = null;
                                    this.tempReady = false;
                                }

                                if (this.dataList && this.dataList.length > 0) {
                                    this.tempReady = true;
                                } else {
                                    this.empty = true;
                                }
                            },
                            error => {
                                console.error(error);
                            }
                        );
                },
                error => {
                    console.error(error);
                }
            );
    }*/

    filterLogsByDate(e) {

        const filterName = e.target.id;
        const resetPage = 1;
        this.chartTimeLineFilter = filterName;

        if (filterName === 'hour') {
            this.dateFilter = +this.dateFilterTypes.hour;

        } else if (filterName === 'day') {
            this.dateFilter = +this.dateFilterTypes.day;

        } else if (filterName === 'week') {
            this.dateFilter = +this.dateFilterTypes.week;
        }

        if (this.type === this.logTypes.TEMPERATURE) {
            this.loadTemperatureLogs(resetPage);
        } else {
            this.loadLogs(resetPage);
        }
    }

    removeLogsByType() {
        this.authService.removeLogs(+this.serverId, +this.type)
            .subscribe(
                res => {
                    if (res.status && res.status === 200) {
                        this.loadLogs(this.page);
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

    pageChanged(event: any) {
        this.page = event.page;
        this.getLogData(this.page);
    }

    getLogData(page: number) {
        if (this.type === this.logTypes.TEMPERATURE) {
            this.loadTemperatureLogs(page);
        } else {
            this.loadLogs(page);
        }
    }

    loadLogs(page: number) {
        this.authService.getServerLogs(+this.serverId, page, this.type, this.dateFilter, 0)
            .subscribe(
                logs => {
                    if (logs.data) {
                        this.page = page;
                        this.dataList = logs.data.logs_data;
                        this.paginationTotalItem = +logs.data.count;
                        this.initChartData(this.dataList);
                    } else {
                        this.dataList = null;
                        this.tempReady = false;
                    }

                    if (this.dataList && this.dataList.length > 0) {
                        this.tempReady = true;
                    } else {
                        this.empty = true;
                    }
                },
                error => {
                    console.error(error);
                }
            );
    }

    openModal() {
        this.authService.getServerTempById(this.serverId)
            .subscribe(
                res => {
                    this.bsModalRef = this.modalService.show(ServerTemperatureComponent, {ignoreBackdropClick: true});
                    this.bsModalRef.content.init(res.data, this.serverId);
                },
                error => {
                    console.error(error);
                }
            );
    }

    selectTab(e) {
        if (e.id === 'chart') {
            this.tableTab = false;
        } else {
            this.tableTab = true;
        }
    }

    confirm() {
        this.bsModalRef.hide();
        this.removeLogsByType();
    }

    decline() {
        this.bsModalRef.hide();
    }
}
