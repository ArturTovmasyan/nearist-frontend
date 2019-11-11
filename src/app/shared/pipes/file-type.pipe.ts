import { Pipe, PipeTransform } from '@angular/core';
import { FileTypes } from '../../models/fileTypes';

@Pipe({
    name: 'fileType'
})
export class FileTypePipe implements PipeTransform {

    fileTypes: typeof FileTypes = FileTypes;

    transform(number: any = 0): string {
        return this.fileTypes[number];
    }
}
