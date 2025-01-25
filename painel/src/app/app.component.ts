import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopMenuComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'painel';
}
