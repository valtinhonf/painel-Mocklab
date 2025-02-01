import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FrmLoginComponent} from '../../frm-login/frm-login.component';
import {HomePainelComponent} from '../home-painel.component';
import {FrmMockComponent} from './frm-mock/frm-mock.component';
import {FrmProjectComponent} from './frm-project/frm-project.component';

const routes: Routes = [
  {path: ':id', component: FrmMockComponent},
  {path: ':id/:idProject', component: FrmMockComponent},
  {path: 'project/d/:id', component: FrmProjectComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MocksModule { }

