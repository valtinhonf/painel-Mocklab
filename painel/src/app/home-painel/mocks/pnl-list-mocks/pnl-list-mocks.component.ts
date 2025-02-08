import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {MockService} from '../services/mock.service';
import {LoggedData} from '../../../frm-login/LoggedData';
import {MockProject} from '../models/MockProject';
import {Button} from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { Router } from '@angular/router';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AuthService} from '../../../frm-login/auth.service';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/Project';
import {isObjectNotEmpty} from '../../../utils/Functions';
import {NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Divider} from 'primeng/divider';
import {Chip} from 'primeng/chip';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-pnl-list-mocks',
  imports: [
    TableModule,
    NgIf,
    Button,
    PopoverModule,
    ConfirmPopupModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Tooltip,
    Divider,
    Chip,
    Tag
  ],
  templateUrl: './pnl-list-mocks.component.html',
  styleUrl: './pnl-list-mocks.component.css'
})

export class PnlListMocksComponent implements OnInit {


  @Input() loggedData?: LoggedData;
  mocksProjects: MockProject[] = [];
  mockSelected!: MockProject;

  projects: Project[] = [];
  idProjectSelected!: string;

  constructor(private mockSrv: MockService, private router: Router, private projectSrv: ProjectService,
              private confirmationService: ConfirmationService, private messageService: MessageService) {}

    ngOnInit(): void {
      this.loadMocks();
      this.loadProjects();
    }

    loadMocks(): void {
      if (this.loggedData) {
        this.mockSrv.findAllMocks(this.loggedData?.idPublicOrganization, this.loggedData.idPublicUser).subscribe(res => {
          this.mocksProjects = res;
        })
      }
    }

  loadProjects(): void {
    if (this.loggedData) {
      this.projectSrv.listAllProjectsByOrganization(this.loggedData?.idPublicOrganization).subscribe(res => {
        this.projects = res;
      })
    }
  }

    newMock(event: Event, element: any, idProject: string = ''){
      element.hide(event)
      this.router.navigate([`/painel/mock/0/${idProject}`]);
    }

    viewMock(id: string){
      this.router.navigate(['/painel/mock/' + id]);
    }

  deleteMock(event: Event, element: any){
    element.hide(event)
    this.confirmDeleteMock(event)
  }

  confirmDeleteMock(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this mock?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        if (this.loggedData) {
          this.mockSrv.deleteMock(this.loggedData.idPublicUser, this.mockSelected.idmockpublic).subscribe(res => {
            this.messageService.add({key:'global', severity: 'info', summary: 'Confirmed', detail: 'Mock deleted', life: 3000 });
            this.mocksProjects.splice(this.mocksProjects.findIndex(m => (m.idmockpublic == this.mockSelected.idmockpublic)), 1);
          }, error => {
            this.messageService.add({key:'global', severity: 'error', summary: 'Error', detail: 'An error occurred trying to delete this mock!', life: 3000 });
          })
        }
      },
      reject: () => {
       return
      }
    });
  }

  deleteProject(event: Event, element: any){
    element.hide(event)
    this.confirmDeleteProject(event)
  }

  confirmDeleteProject(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this project?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        if (this.loggedData) {
          this.projectSrv.deleteById(this.loggedData.idPublicUser, this.idProjectSelected).subscribe(res => {
            this.messageService.add({key:'global', severity: 'info', summary: 'Confirmed', detail: 'Project deleted', life: 3000 });
          }, error => {
            this.messageService.add({key:'global', severity: 'error', summary: 'Error', detail: 'An error occurred trying to delete this project!', life: 3000 });
          })
        }
      },
      reject: () => {
        return
      }
    });
  }

  newProject(event: Event, element: any){
    element.hide(event)
    this.router.navigate(['/painel/mock/project/d/0']);
  }

  editProject(event: Event, element: any, idProject: string){
    element.hide(event)
    this.router.navigate(['/painel/mock/project/d/'+ idProject]);
  }
}
