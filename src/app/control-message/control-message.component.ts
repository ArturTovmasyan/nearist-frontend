import { Component, Input } from '@angular/core';
import { ValidationService } from '../shared';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-control-messages',
    templateUrl: './control-message.component.html',
    styleUrls: ['./control-message.component.scss']
})

export class ControlMessageComponent {
    @Input() control: FormControl;

    constructor() {
    }

    get errorMessage() {
        for (const propertyName in this.control.errors) {

            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}
