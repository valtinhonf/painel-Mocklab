import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FrmMockComponent} from '../mocks/frm-mock/frm-mock.component';
import {FrmProjectComponent} from '../mocks/frm-project/frm-project.component';
import {FrmOrganizationComponent} from './frm-organization/frm-organization.component';
import {FrmUserComponent} from './frm-user/frm-user.component';

const routes: Routes = [
  {path: 'organization', component: FrmOrganizationComponent},
  {path: 'user', component: FrmUserComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UsersModule { }
