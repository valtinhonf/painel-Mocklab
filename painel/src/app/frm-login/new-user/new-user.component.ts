import {Component, OnInit, signal} from '@angular/core';
import {Divider} from 'primeng/divider';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-new-user',
  imports: [
    Divider,
    ReactiveFormsModule,
    ButtonModule,
    InputText,
    Message
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {

  messagesStep1 = signal<any[]>([]);
  messagesStep2 = signal<any[]>([]);

  frmSignupForm!: FormGroup;

  iStep: number = 1;

  constructor(private authSrv: AuthService, private route: Router, private messageService: MessageService) {
    this.createFormSignUp()
  }

    ngOnInit(): void {
    this.iStep = 1;
    }


    private createFormSignUp(): void {
      this.frmSignupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        retypePassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      })
    }

    nextStep(){
      if (this.iStep === 1) {
        if (!this.frmSignupForm.controls['email'].valid || !this.frmSignupForm.controls['name'].valid){
          this.messagesStep1.set([{severity: 'error', content: 'The username or the password is invalid!'}])
          return;
        }
        this.iStep = 2;
      }
    }
    save(){
      if (this.frmSignupForm.controls['password'].valid && this.frmSignupForm.controls['retypePassword'].valid && this.frmSignupForm.controls['retypePassword'].value === this.frmSignupForm.controls['retypePassword'].value){
        this.authSrv.saveNewUser(this.frmSignupForm.controls['email'].value, this.frmSignupForm.controls['name'].value, this.frmSignupForm.controls['password'].value).subscribe(res=> {
          this.messageService.add({key:'global', severity: 'success', detail: "The user was saved successfully."});
          this.route.navigate(['login']);
        }, err => {
          this.messageService.add({key:'global', severity: 'error', detail: "An error occurred while saving your account."});
        })
      } else {
        this.messagesStep2.set([{severity: 'error', content: 'The password is invalid!'}])
        return;
      }
    }
}
