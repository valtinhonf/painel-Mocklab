import { Routes } from '@angular/router';
import {FrmLoginComponent} from './frm-login/frm-login.component';
import {HomePainelComponent} from './home-painel/home-painel.component';
import { FrmMockComponent } from './home-painel/mocks/frm-mock/frm-mock.component';
import {NewUserComponent} from './frm-login/new-user/new-user.component';

export const routes: Routes = [
  {path: '', component: FrmLoginComponent},
  {path: 'login', component: FrmLoginComponent},
  {path: 'signup', component: NewUserComponent},
  {path: 'painel', component: HomePainelComponent, children: [
    {path: 'mock',  loadChildren: () => import('./home-painel/mocks/mocks.module').then(m => m.MocksModule)},
    {path: 'user',  loadChildren: () => import('./home-painel/users/users.module').then(m => m.UsersModule)}
    ]}
];
