import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {ActivatedRoute} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {ProjectService} from '../services/project.service';
import {MessageService} from 'primeng/api';
import {LoggedData} from '../../../frm-login/LoggedData';
import {AuthService} from '../../../frm-login/auth.service';

@Component({
  selector: 'app-frm-project',
  imports: [
    FormsModule,
    Button,
    InputText,
    ReactiveFormsModule
  ],
  templateUrl: './frm-project.component.html',
  styleUrl: './frm-project.component.css'
})
export class FrmProjectComponent implements OnInit {

  frmProject!: FormGroup;

  title: string = 'New Project';

  loggedData: LoggedData|undefined;

  constructor(private aRoute: ActivatedRoute, private projectSrv: ProjectService,
              private messageService: MessageService, private authSrv: AuthService,) {
    this.loggedData = this.authSrv.retrieveLoggedData();
  }

  ngOnInit(): void {
    this.montaFormulario();
    this.aRoute.params.subscribe(params => {
      if (params['id'] !== undefined && params['id'] !== '0') {
        this.title = 'Editing the project';
      }
    })
  }

  montaFormulario(){
    this.frmProject = new FormGroup({
      idproject: new FormControl(''),
      idorganization: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      observation: new FormControl('')
    })
  }

  save(){
    if (this.frmProject.valid && this.loggedData) {
      this.frmProject.controls['idorganization'].setValue(this.loggedData?.idPublicOrganization);
      this.projectSrv.save(this.frmProject.value).subscribe(res => {
        console.log(res);
        this.frmProject.reset();
        this.messageService.add({key: 'global', severity: 'success', summary: 'Successfully saved!'});
      })
    }
  }

}
