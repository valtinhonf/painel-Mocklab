import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {ProjectService} from '../services/project.service';
import {MessageService} from 'primeng/api';
import {LoggedData} from '../../../frm-login/LoggedData';
import {AuthService} from '../../../frm-login/auth.service';
import {Project} from '../models/Project';

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
              private messageService: MessageService, private authSrv: AuthService, private route: Router) {
    this.loggedData = this.authSrv.retrieveLoggedData();
  }

  ngOnInit(): void {
    this.montaFormulario();
    this.aRoute.params.subscribe(params => {
      if (params['id'] !== undefined && params['id'] !== '0') {
        this.projectSrv.getById(params['id']).subscribe(res => {
          this.loadData(res)
        })
        this.title = 'Editing the project';
      }
    })
  }

  montaFormulario(){
    this.frmProject = new FormGroup({
      idproject: new FormControl(''),
      idOrganization: new FormControl(''),
      idSequence: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      observation: new FormControl('')
    })
  }

  loadData(project: Project){
    this.frmProject.patchValue({
      idproject: project.idproject,
      idOrganization: project.idorganization,
      idSequence: project.idSequence,
      name: project.name,
      description: project.description,
      observation: project.observation,
    })
  }

  save(){
    if (this.frmProject.valid && this.loggedData) {
      this.frmProject.controls['idOrganization'].setValue(this.loggedData?.idPublicOrganization);
      if (this.frmProject.controls['idproject'].value != '') {
        this.projectSrv.update(this.frmProject.value).subscribe(res => {
          this.frmProject.reset();
          this.messageService.add({key: 'global', severity: 'success', summary: 'Successfully saved!'});
          this.route.navigate(['/painel/'])
        })
      } else {
        this.projectSrv.save(this.frmProject.value).subscribe(res => {
          this.frmProject.reset();
          this.messageService.add({key: 'global', severity: 'success', summary: 'Successfully saved!'});
          this.route.navigate(['/painel/'])
        })
      }
    }
  }

}
