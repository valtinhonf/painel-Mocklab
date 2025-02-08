import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {MockProject} from '../models/MockProject';
import {Observable, Subscription} from 'rxjs';
import { Mock } from '../models/Mock';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor( private http: HttpClient ) {

  }

  findAllMocks(idOrganization: string, idPublicUser: string): Observable<MockProject[]> {
    return this.http.get<MockProject[]>(`${environment.url_api}/mock/byorganization/${idOrganization}/${idPublicUser}`)
  }

  findMockById(idMock: string){
    return this.http.get<Mock>(`${environment.url_api}/mock/${idMock}`)
  }

  save(mock: Mock){
    if (mock.idmockpublic && mock.idmockpublic!= '') {
      return this.http.put<Mock>(`${environment.url_api}/mock`, mock)
    } else {
      return this.http.post<Mock>(`${environment.url_api}/mock`, mock)
    }
  }

  deleteMock(idUser: string, idMock: string){
    return this.http.delete<Mock>(`${environment.url_api}/mock/${idUser}/${idMock}`)
  }

  loadLogs(idMock: string){
    return this.http.get<any[]>(`${environment.url_api}/mocks/logs/${idMock}`)
  }
}
