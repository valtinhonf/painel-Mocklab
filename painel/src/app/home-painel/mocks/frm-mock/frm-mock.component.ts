import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mock } from '../models/Mock';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {DropdownModule} from 'primeng/dropdown';
import {TabsModule} from 'primeng/tabs';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {MockService} from '../services/mock.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../../frm-login/auth.service';
import {LoggedData} from '../../../frm-login/LoggedData';
import {Clipboard} from "@angular/cdk/clipboard";
import {environment} from '../../../../environments/environment';
import { DatePipe, DecimalPipe } from '@angular/common';
import { isObjectNotEmpty } from '../../../utils/Functions';
import {Popover} from 'primeng/popover';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/Project';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-frm-mock',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputGroupModule, InputGroupAddonModule, DropdownModule,
    TabsModule, JsonEditorComponent, DatePipe, Popover, TableModule],
  standalone: true,
  templateUrl: './frm-mock.component.html',
  styleUrl: './frm-mock.component.css'
})

export class FrmMockComponent implements OnInit{

  @Output() mockSavedEvent: EventEmitter<any> = new EventEmitter();

  projectSelected!: Project;

  public editorOptions_ResponseBody: JsonEditorOptions;
  public editorOptions_PostSchemaValidation: JsonEditorOptions;

  tabSelected: number = 0;
  logs: any[] = []

  loggedData: LoggedData|undefined;

  methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  responseCodes: string[] = ['100', '200', '201', '300', '404', '500'];

  frmMock!: FormGroup;

  constructor(private aRoute: ActivatedRoute, private mockSrv: MockService, private messageSrv: MessageService,
              private authSrv: AuthService, private clipboard: Clipboard, private projectSrv: ProjectService) {
    this.loggedData = authSrv.retrieveLoggedData();
    this.montaFormulario();
    this.editorOptions_ResponseBody = new JsonEditorOptions()
    this.editorOptions_ResponseBody.mode = 'code';
    this.editorOptions_ResponseBody.theme = 0;

    this.editorOptions_PostSchemaValidation = new JsonEditorOptions()
    this.editorOptions_PostSchemaValidation.mode = 'code';
    this.editorOptions_PostSchemaValidation.theme = 0;
   }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.logs = []
      if (params['idProject'] != undefined && params['idProject'] != '' && params['id'] == '0') {
        this.projectSrv.getById(params['idProject']).subscribe(res => {
          this.projectSelected = res;
          this.frmMock.controls['idproject'].setValue(this.projectSelected.idproject);
        })
      } else
      if (params['id'] != '0') {
        this.mockSrv.findMockById(params['id']).subscribe(mock => {
          this.preencheFormulario(mock)
        })
      } else {
        this.frmMock.reset()
      }
    })
  }

  montaFormulario(): void {
    this.frmMock = new FormGroup({
      idmockpublic: new FormControl(null),
      idproject: new FormControl(null),
      iduser:new FormControl(this.loggedData?.idPublicUser),
      path: new FormControl(null, Validators.required),
      method: new FormControl('GET', Validators.required),
      statusCodeResponse: new FormControl('200'),
      responseBody: new FormControl(''),
      name: new FormControl(null, Validators.required),
      observation: new FormControl(null),
      description: new FormControl(),
      postSchemaRequest: new FormControl(''),
      status: new FormControl(null),
      createdat: new FormControl(null),
      updatedat: new FormControl(null),
      expiresin: new FormControl(null)
    })
  }

  preencheFormulario(mock: Mock): void {
    this.frmMock.patchValue({
      idmockpublic: mock.idmockpublic,
      idproject: mock.idproject,
      iduser:mock.iduser,
      path: mock.path,
      method: mock.method,
      statusCodeResponse: mock.statusCodeResponse,
      responseBody: JSON.parse(mock.responseBody),
      name: mock.name,
      observation: mock.observation,
      description: mock.description,
      postSchemaRequest: JSON.parse(mock.postSchemaRequest),
      status: mock.status,
      createdat: mock.createdat,
      updatedat: mock.updatedat
    })
  }

  copytoClipBoard(): void {
    const keyToCopy = this.frmMock.controls['idproject'].value || this.frmMock.controls['iduser'].value;
    this.clipboard.copy(`${environment.url_api}/mocklab/${keyToCopy}/${this.frmMock.controls['path'].value}`)
    this.messageSrv.add({key:'global', severity:"success", detail: "The mock copied to clipboard successfully!"});
  }

  save(){
    if (this.frmMock.valid) {
      this.frmMock.controls['iduser'].setValue(this.loggedData?.idPublicUser);

      if (isObjectNotEmpty(this.frmMock.controls['postSchemaRequest'].value)){
        this.frmMock.controls['postSchemaRequest'].setValue( JSON.stringify(this.frmMock.controls['postSchemaRequest'].value));
       } else {this.frmMock.controls['postSchemaRequest'].setValue(null)}

      if (isObjectNotEmpty(this.frmMock.controls['responseBody'].value)){
        this.frmMock.controls['responseBody'].setValue( JSON.stringify(this.frmMock.controls['responseBody'].value));
       } else {this.frmMock.controls['responseBody'].setValue(null)}

      this.mockSrv.save(this.frmMock.value).subscribe(res => {
        this.frmMock.controls['responseBody'].setValue( JSON.parse(this.frmMock.controls['responseBody'].value));
        this.frmMock.controls['postSchemaRequest'].setValue( JSON.parse(this.frmMock.controls['postSchemaRequest'].value));
        this.messageSrv.add({key:'global', severity:"success", detail: "The mock " + this.frmMock.controls['name'].value + " was saved successfully!"});
        this.mockSavedEvent.emit(res);
      })
    }
  }

  loadLogs(){
    console.log(this.tabSelected);
    if (this.frmMock.controls['idmockpublic'].value){
      this.mockSrv.loadLogs(this.frmMock.controls['idmockpublic'].value).subscribe(logs => this.logs = logs);
    }
  }

}

