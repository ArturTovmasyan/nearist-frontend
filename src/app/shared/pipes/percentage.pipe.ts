import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

    total: any;
    used: any;

    transform(total: any, used: any): any {

        this.total = +total;
        this.used = +used;

        const percent = used * 100 / total;
        return Math.floor(percent) + '%';
    }
}
