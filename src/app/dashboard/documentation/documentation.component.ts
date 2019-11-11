import { Component, OnInit } from '@angular/core';
import {routerTransition} from "../../router.animations";

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
    animations: [routerTransition()]
})
export class DocumentationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
