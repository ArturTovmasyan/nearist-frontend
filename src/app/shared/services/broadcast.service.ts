import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class BroadcasterService {
    private events = {};

    constructor() {
    }

    broadcast(key: any, data?: any) {
        if (this.events[key] && this.events[key].length) {
            for (const ev of this.events[key]) {
                ev.next(data);
            }
        }
    }

    on<T>(key: any): any {

        if (!this.events[key] || !this.events[key].length) {
            this.events[key] = [new Subject<any>()];
        } else {
            this.events[key].push(new Subject<any>());
        }

        const currentSub = this.events[key][this.events[key].length - 1];

        return {
            subscribe: (cb) => {
                return currentSub.subscribe(cb);
            },
            unsubscribe: () => {
                currentSub.unsubscribe();
                this.events[key] = this.events[key].filter((ev) => {
                    return ev !== currentSub;
                });
            }
        };
    }
}
