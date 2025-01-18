import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../frm-login/auth.service';
import {Router} from '@angular/router';
import {LoggedData} from '../../frm-login/LoggedData';

@Component({
  selector: 'app-top-menu',
  imports: [
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit {

    loggedData?: LoggedData;

    constructor(private authService: AuthService, private router: Router) {
      this.authService.loggedDataChange.subscribe(loggedData => this.loggedData = loggedData);
    }

    ngOnInit(): void {
      this.loggedData = this.authService.retrieveLoggedData();
      if (!this.loggedData) {
        this.router.navigate(['/login']);
      }
    }

    ngOnDestroy() {
      this.authService.loggedDataChange.unsubscribe();
    }

}
