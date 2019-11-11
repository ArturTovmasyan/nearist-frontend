import { Component, OnInit, HostListener } from '@angular/core';
import {routerTransition} from "../../router.animations";
import {AuthService} from "../../shared";

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
    animations: [routerTransition()]
})
export class ActivityComponent implements OnInit {
    errorMessage: string;
    logs     = [];
    page     = 1;
    limit    = 25;
    finished = false;

    sum            = 0;
    scrollDistance = 1;

    constructor(protected authService: AuthService) {
        this.appendItems();
    }

    ngOnInit() {

    }

    appendItems() {
        this.authService.getCustomerLogs(this.page, this.limit)
            .subscribe(
                res => {
                    this.errorMessage = null;

                    if (res.status && res.status === 200 && res.data.logs) {
                        if (!res.data.logs.length || res.data.logs.length < this.limit) {
                            this.finished = true;
                        }

                        this.logs = this.logs.concat(res.data.logs);
                    }
                },
                error => {
                    this.errorMessage = error.error.data.errors;
                }
            );

        this.page++;
    }

    onScrollDown () {
        if (this.finished) {
            return false;
        }

        this.appendItems();
    }
}
