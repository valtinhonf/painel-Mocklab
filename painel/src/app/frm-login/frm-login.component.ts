import {Component, OnInit, signal} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {LoggedData} from './LoggedData';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-frm-login',
  imports: [
    FormsModule,
    InputText,
    InputGroup,
    InputGroupAddon,
    Button,
    Message,
    RouterLink
  ],
  templateUrl: './frm-login.component.html',
  styleUrl: './frm-login.component.css'
})
export class FrmLoginComponent implements OnInit {

  messages = signal<any[]>([]);

    username?: string;
    password?: string;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
      if (this.authService.isLogged()){
        this.router.navigate(['/painel']);
      }
    }

    login(){
      if (this.username && this.password){
        this.authService.login(this.username, this.password).subscribe((res:LoggedData) => {
          this.authService.storageLoggedData(res)
          this.router.navigate(['/painel']);
        }, error => {
          if (error.status === 404) {
            this.messages.set([{severity: 'error', content: 'The username or the password is not founded!'}])
          }
        })
      }
    }

}
