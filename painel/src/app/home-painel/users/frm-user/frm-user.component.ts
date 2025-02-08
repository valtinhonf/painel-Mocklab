import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {MessageService} from 'primeng/api';
import {UserService} from '../user.service';
import {User} from '../User';
import {LoggedData} from '../../../frm-login/LoggedData';
import {AuthService} from '../../../frm-login/auth.service';
import {InputGroup} from 'primeng/inputgroup';

@Component({
  selector: 'app-frm-user',
  imports: [
    Button,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    InputGroup
  ],
  templateUrl: './frm-user.component.html',
  styleUrl: './frm-user.component.css'
})

export class FrmUserComponent implements OnInit {

  frmUser!: FormGroup;

  logggetData?: LoggedData;

  changingUsername: boolean = false;

  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthService) {
    this.createForm();
    this.logggetData = this.authService.retrieveLoggedData();
  }
  ngOnInit(): void {
    if (this.logggetData) {
      this.userService.getUser(this.logggetData.idPublicUser).subscribe(res =>  {
        this.loadData(res);
        })
    }
  }

  save(): void {
    if (this.frmUser.valid){
      this.userService.saveUser(this.frmUser.value).subscribe(res => {
        this.messageService.add({key:'global', severity: 'success', summary: 'Successfully saved'});
      }, error => {
        this.messageService.add({key:'global', severity: 'error', summary: 'An error occurred!'});
      })
    }
  }

  createForm(): void {
    this.frmUser = new FormGroup({
      iduser: new FormControl(''),
      idorganization: new FormControl(''),
      idsequence: new FormControl(0),
      username: new FormControl(''),
      shortname: new FormControl(''),
      fullname: new FormControl(''),
      status: new FormControl(''),
      idprofile: new FormControl(0),
      createdat: new FormControl(''),
      updatedat: new FormControl(''),
    })
  }

  loadData(user: User): void {
    this.frmUser.patchValue({
      iduser: user.iduser,
      idorganization: user.idorganization,
      idsequence: user.idsequence,
      username: user.username,
      shortname: user.shortname,
      fullname: user.fullname,
      status: user.status,
      idprofile: user.idprofile,
      createdat: user.createdat,
      updatedat: user.updatedat,
    })
  }

  confirmChangeUsername(){
    this.userService.changeUsername(this.frmUser.controls['iduser'].value, this.frmUser.controls['username'].value).subscribe(res => {
      this.messageService.add({key:'global', severity: 'success', summary: 'The username was successfully changed!'});
    }, error => {
      this.messageService.add({key:'global', severity: 'error', summary: 'An error occurred!'});
    })

  }



}
