import {Component, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LoggedData} from './LoggedData';

@Component({
  selector: 'app-frm-login',
  imports: [
    FormsModule,
    InputText,
    InputGroup,
    InputGroupAddon,
    Button
  ],
  templateUrl: './frm-login.component.html',
  styleUrl: './frm-login.component.css'
})
export class FrmLoginComponent implements OnInit {

    username?: string;
    password?: string;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    login(){
      if (this.username && this.password){

        this.authService.login(this.username, this.password).subscribe((res:LoggedData) => {
          console.log(res);
          this.authService.storageLoggedData(res)
          this.router.navigate(['/home']);
        })
      }
    }

}
