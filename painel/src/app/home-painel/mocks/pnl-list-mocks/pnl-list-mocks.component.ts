import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {MockService} from '../mock.service';
import {LoggedData} from '../../../frm-login/LoggedData';
import {MockProject} from '../MockProject';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-pnl-list-mocks',
  imports: [
    TableModule,
    Button
  ],
  templateUrl: './pnl-list-mocks.component.html',
  styleUrl: './pnl-list-mocks.component.css'
})

export class PnlListMocksComponent implements OnInit {

  @Input() loggedData?: LoggedData;
  mocksProjects: MockProject[] = [];

  constructor(private mockSrv: MockService) {
  }

    ngOnInit(): void {
      this.loadMocks();
    }

    loadMocks(): void {
      if (this.loggedData) {
        this.mockSrv.findAllMocks(this.loggedData?.idPublicOrganization, this.loggedData.idPublicUser).subscribe(res => {
          console.log(res);
          this.mocksProjects = res;
        })
      }
    }

}
