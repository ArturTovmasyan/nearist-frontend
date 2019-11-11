import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {BoardLaneMatrixComponent} from './board-lane-matrix.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [BoardLaneMatrixComponent],
    exports: [BoardLaneMatrixComponent]
})
export class BoardLaneMatrixModule {}
