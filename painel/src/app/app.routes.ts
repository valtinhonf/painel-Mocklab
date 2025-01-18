import { Routes } from '@angular/router';
import {FrmLoginComponent} from './frm-login/frm-login.component';
import {HomePainelComponent} from './home-painel/home-painel.component';

export const routes: Routes = [
  {path: '', component: FrmLoginComponent},
  {path: 'login', component: FrmLoginComponent},
  {path: 'home', component: HomePainelComponent}
];
