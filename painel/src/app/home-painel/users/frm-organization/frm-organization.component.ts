import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Organization} from '../Organization';
import {ActivatedRoute, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {AuthService} from '../../../frm-login/auth.service';
import {LoggedData} from '../../../frm-login/LoggedData';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-frm-organization',
  imports: [
    Button,
    ReactiveFormsModule,
    InputText,
    DropdownModule,
    InputGroup,
    InputGroupAddon
  ],
  templateUrl: './frm-organization.component.html',
  styleUrl: './frm-organization.component.css'
})
export class FrmOrganizationComponent implements OnInit {

  frmOrganization!: FormGroup;

  private loggedData?: LoggedData;

  constructor(private userService: UserService, private route: Router, private authService: AuthService, private messageService: MessageService) {
    this.createForm();
    this.loggedData = this.authService.retrieveLoggedData()
  }
  ngOnInit(): void {
    console.log(this.loggedData)
      if (this.loggedData) {
          this.userService.getOrganization(this.loggedData?.idPublicOrganization).subscribe(response => {
            this.loadData(response);
          })
      }
    }

  createForm(){
    this.frmOrganization = new FormGroup({
      idorganization: new FormControl(''),
      fullname: new FormControl('', Validators.required),
      shortname: new FormControl(''),
      status: new FormControl(''),
      createdat: new FormControl(''),
      updatedat: new FormControl(''),
      idplan: new FormControl(0),
    })
  }

  loadData(organization: Organization){
    this.frmOrganization.patchValue({
      idorganization: organization.idorganization,
      fullname: organization.fullname,
      shortname: organization.shortname,
      status: organization.status,
      createdat: organization.createdat,
      updatedat: organization.updatedat,
      idplan: organization.idplan,
    })
  }

  save() {
    if (this.frmOrganization.valid){
      this.userService.saveOrganization(this.frmOrganization.value).subscribe(response => {
        this.messageService.add({key: 'global', severity: 'success', summary: 'Organization successfully saved!'});
        this.route.navigate(['/painel'])
      }, error => {
        this.messageService.add({key: 'global', severity: 'error', summary: 'Error on saving organization!'});
      })
    }
  }



}
