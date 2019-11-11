import {Component, Input, OnInit} from '@angular/core';
import {AuthService, BroadcasterService} from "../../index";
import {BsModalService} from "ngx-bootstrap";
import {routerTransition} from "../../../router.animations";

@Component({
  selector: 'app-board-lane-matrix',
  templateUrl: './board-lane-matrix.component.html',
  styleUrls: ['./board-lane-matrix.component.scss'],
    animations: [routerTransition()]
})

export class BoardLaneMatrixComponent implements OnInit {
    @Input() boardList          = [];
    @Input() laneList           = [];
    @Input() reservationData    = [];
    @Input() boardDetailChecked = false;

    constructor(protected authService: AuthService,
                protected modalService: BsModalService,
                protected broadcaster: BroadcasterService
    ) { }

    ngOnInit() {
    }

    changeCheckbox(e) {
        const value = e.target.value;
        const checked = e.target.checked;

        this.updateFormData(checked, value);
    }

    updateFormData(checked, value) {
        const index: number = this.reservationData.indexOf(value);

        if (checked && index == -1) {
            if (index != -1) {
                this.reservationData.splice(index, 1);
            }
            this.reservationData.push(value);
        } else if (index != -1) {
            this.reservationData.splice(index, 1);
        }

        if (this.reservationData.length > 0) {
            this.boardDetailChecked = true;
        } else {
            this.boardDetailChecked = false;
        }
    }

    changeColumn(e) {
        let element = e.target;
        let parent  = element.parentNode;
        let index   = Array.prototype.indexOf.call(parent.children, element);

        let table     = parent.parentNode.parentNode;
        let rows      = table.querySelectorAll('tbody tr');
        let isChecked;

        // Using forEach
        rows.forEach(( row, rowIndex ) => {
            let td = row.querySelectorAll('td');

            if (td[index] != undefined) {
                let input = td[index].querySelector('input');

                if (rowIndex > 0) {
                    input.checked = isChecked;
                } else {
                    isChecked = !input.checked;
                    input.checked = !input.checked;
                }

                this.updateFormData(input.checked, input.value);
            }
        });
    }

    changeRow(e, i) {
        let element = e.target;
        let parent  = element.parentNode;

        let rows      = parent.querySelectorAll('td input');
        let isChecked;

        // Using forEach
        rows.forEach(( input, inputIndex ) => {
            if (inputIndex > 0) {
                input.checked = isChecked;
            } else {
                isChecked = !input.checked;
                input.checked = !input.checked;
            }

            this.updateFormData(input.checked, input.value);
        });
    }

    changeAll(e) {
        let element = e.target;
        let table   = element.parentNode.parentNode.parentNode;

        let inputs  = table.querySelectorAll('td input');
        let isChecked;

        // Using forEach
        inputs.forEach(( input, inputIndex ) => {
            if (inputIndex > 0) {
                input.checked = isChecked;
            } else {
                isChecked = !input.checked;
                input.checked = !input.checked;
            }

            this.updateFormData(input.checked, input.value);
        });
    }
}
