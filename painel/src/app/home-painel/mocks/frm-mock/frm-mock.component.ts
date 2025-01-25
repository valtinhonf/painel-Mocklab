import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mock } from '../models/Mock';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {DropdownModule} from 'primeng/dropdown';
import {TabsModule} from 'primeng/tabs';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {MockService} from '../mock.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../../frm-login/auth.service';
import {LoggedData} from '../../../frm-login/LoggedData';

@Component({
  selector: 'app-frm-mock',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputGroupModule, InputGroupAddonModule, DropdownModule,
    TabsModule, JsonEditorComponent,],
  standalone: true,
  templateUrl: './frm-mock.component.html',
  styleUrl: './frm-mock.component.css'
})

export class FrmMockComponent implements OnInit{

  @Output() mockSavedEvent: EventEmitter<any> = new EventEmitter();

  public editorOptions: JsonEditorOptions;

  loggedData: LoggedData|undefined;

  methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  responseCodes: string[] = ['100', '200', '201', '300', '404', '500'];

  frmMock!: FormGroup;

  constructor(private aRoute: ActivatedRoute, private mockSrv: MockService, private messageSrv: MessageService, private authSrv: AuthService) {
    this.loggedData = authSrv.retrieveLoggedData();
    this.montaFormulario();
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'code';
    this.editorOptions.theme = 0;
   }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      if (params['id'] != '0') {
        this.mockSrv.findMockById(params['id']).subscribe(mock => {
          this.preencheFormulario(mock)
        })

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
      statusCodeResponse: new FormControl(null),
      responseBody: new FormControl(''),
      name: new FormControl(null, Validators.required),
      observation: new FormControl(null),
      description: new FormControl(),
      postSchemaRequest: new FormControl(null),
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
      createdat: mock.createdat
    })
  }

  save(){
    if (this.frmMock.valid) {
      this.frmMock.controls['postSchemaRequest'].setValue( JSON.stringify(this.frmMock.controls['postSchemaRequest'].value));
      this.frmMock.controls['responseBody'].setValue( JSON.stringify(this.frmMock.controls['responseBody'].value));
      this.mockSrv.save(this.frmMock.value).subscribe(res => {
        this.messageSrv.add({key:'global', severity:"success", detail: "The mock " + this.frmMock.controls['name'].value + " was saved successfully!"});
        this.mockSavedEvent.emit(res);
      })
    }
  }
}
