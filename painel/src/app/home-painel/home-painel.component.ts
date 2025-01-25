import {Component, OnInit} from '@angular/core';
import {PnlListMocksComponent} from './mocks/pnl-list-mocks/pnl-list-mocks.component';
import {AuthService} from '../frm-login/auth.service';
import {LoggedData} from '../frm-login/LoggedData';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-painel',
  imports: [
    RouterOutlet,
    PnlListMocksComponent
  ],
  templateUrl: './home-painel.component.html',
  styleUrl: './home-painel.component.css'
})

export class HomePainelComponent implements OnInit {

  loggedData?: LoggedData;

  constructor(private authService: AuthService) {

    this.loggedData = authService.retrieveLoggedData();

  }
    ngOnInit(): void {

    }

}
