import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

    bytes: any;

    private units = [
        'B',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB'
    ];

    transform(bytes: any = 0, precision: number = 2): string {
        this.bytes = +bytes;

        if (isNaN(parseFloat(String(bytes))) || !isFinite(this.bytes)) {
            return '0 B';
        }

        let unit = 0;

        while (this.bytes >= 1024) {
            this.bytes /= 1024;
            unit++;
        }

        return this.bytes.toFixed(+precision) + ' ' + this.units[unit];
    }
}
