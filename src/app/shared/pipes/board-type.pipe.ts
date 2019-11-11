import { Pipe, PipeTransform } from '@angular/core';
import { BoardTypes } from '../../models/boardTypes';

@Pipe({
    name: 'boardType'
})
export class BoardTypePipe implements PipeTransform {

    boardTypes: typeof BoardTypes = BoardTypes;

    transform(number: any = 0): string {
        return this.boardTypes[number];
    }
}
