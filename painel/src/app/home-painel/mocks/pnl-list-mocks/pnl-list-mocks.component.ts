import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {MockService} from '../mock.service';
import {LoggedData} from '../../../frm-login/LoggedData';
import {MockProject} from '../MockProject';
import {Button} from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pnl-list-mocks',
  imports: [
    TableModule,
    Button,
    PopoverModule 
  ],
  templateUrl: './pnl-list-mocks.component.html',
  styleUrl: './pnl-list-mocks.component.css'
})

export class PnlListMocksComponent implements OnInit {

  @Input() loggedData?: LoggedData;
  mocksProjects: MockProject[] = [];

  constructor(private mockSrv: MockService, private router: Router) {
  }

    ngOnInit(): void {
      this.loadMocks();
    }

    loadMocks(): void {
      if (this.loggedData) {
        this.mockSrv.findAllMocks(this.loggedData?.idPublicOrganization, this.loggedData.idPublicUser).subscribe(res => {
          this.mocksProjects = res;
        })
      }
    }

    newMock(event: Event, element: any){
      element.hide(event)
      this.router.navigate(['/painel/mock/0']);
    }

    viewMock(id: number){
      this.router.navigate(['/painel/mock/' + id]);
    }

}
