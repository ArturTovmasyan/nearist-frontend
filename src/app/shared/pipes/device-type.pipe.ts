import { Pipe, PipeTransform } from '@angular/core';
import { DeviceTypes } from '../../models/deviceTypes';

@Pipe({
    name: 'deviceType'
})
export class DeviceTypePipe implements PipeTransform {

    deviceTypes: typeof DeviceTypes = DeviceTypes;

    transform(number: any = 0): string {
        return this.deviceTypes[number];
    }
}
