import { Component, OnInit } from '@angular/core';
import {routerTransition} from "../../router.animations";

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    animations: [routerTransition()]
})
export class HomepageComponent implements OnInit {
    constructor() { }

    ngOnInit() {

    }
}