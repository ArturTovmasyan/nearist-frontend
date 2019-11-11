import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    error: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.logout();
    }

    logout() {
        this.authService.logout()
            .subscribe(
                res => {
                    localStorage.clear();
                    this.router.navigate(['/']);
                },
                error => {
                    this.error = error.error.message;
                }
            );
    }

}
